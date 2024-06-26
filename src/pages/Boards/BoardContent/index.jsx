import Box from '@mui/system/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  rectIntersection,
  pointerWithin,
  getFirstCollision } from '@dnd-kit/core'
import { MouseSensor, TouchSensor, PointerSensor } from '~/customLibraries/customSensorsDndKit'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useRef, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { useDispatch } from 'react-redux'
import { boardSlice } from '~/redux/Board/boardSlice'
import { moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis'

const ITEM_TYPE = {
  COLUMN: 'ITEM_TYPE_COLUMN',
  CARD: 'ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const dispatch = useDispatch()
  // Sensors
  //yêu cầu chuột di chuyển 3px để kích hoạt dnd, fix lỗi click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 3 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 50 }
  })
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 3 }
  })

  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor)

  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // state lưu column của 1 cái card trc khi nó bị kéo sang column khác
  // vì dragover đã update lại state nên dragend ko dùng tiếp đc
  const [columnBeforeDrag, setColumnBeforeDrag] = useState(null)

  // state lưu over column lúc đầu trc khi bị update bởi dragover
  // const [overColumnBeforeDrag, setOverColumnBeforeDrag] = useState(null)

  const lastOverId = useRef(null)

  const findColumnByCardId = (cardId) => {
    return board.columns.find(column => column?.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (e) => {
    setActiveDragItemType(e?.active?.data?.current?.columnId
      ? ITEM_TYPE.CARD
      : ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
    if (e?.active?.data?.current?.columnId) {
      setColumnBeforeDrag(findColumnByCardId(e?.active?.id))
    }
  }

  let dndOrderedColumnsDragOver = []
  const handleDragOver = (e) => {
    const { active, over } = e

    // if (!active || !over) return

    if (activeDragItemType === ITEM_TYPE.COLUMN) {
      if (over) {
        const oldIndex = board.columns.findIndex(column => column._id === active.id)
        const newIndex = board.columns.findIndex(column => column._id === over.id)
        dndOrderedColumnsDragOver = arrayMove(board.columns, oldIndex, newIndex)
      }
      // dispatch action
      // dispatch(boardSlice.actions.moveColumn(dndOrderedColumns))


      // return
      // }
      else {
        dispatch(boardSlice.actions.moveColumn(dndOrderedColumnsDragOver))
      }
    }

    if (activeDragItemType === ITEM_TYPE.CARD) {
      if (!active || !over) return

      const activeCard = activeDragItemData
      const overCard = over.data.current
      // tìm column tương ứng của từng card
      const activeColumn = findColumnByCardId(activeCard._id)
      const overColumn = findColumnByCardId(overCard._id)
      if (!overColumn) return

      // xử lý khi 2 cards khác column
      if (activeColumn._id !== overColumn._id) {
        // index của over card trong over column
        const overColumnCardIndex = overColumn?.cards.findIndex(card => card._id === overCard._id)

        // tính index của active card trong over column (cop từ thư viện dnd)
        const isBelowOverItem = active.rect.current.translated &&
              active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        const newCardIndex = overColumnCardIndex >= 0
          ? overColumnCardIndex + modifier
          : overColumn?.cards?.length + 1

        const clonedColumns = cloneDeep(board.columns)
        const clonedActiveColumn = clonedColumns.find(column => column._id === activeColumn._id)
        const clonedOverColumn = clonedColumns.find(column => column._id === overColumn._id)

        if (clonedActiveColumn) {
          clonedActiveColumn.cards = clonedActiveColumn.cards.filter(card => card._id !== activeCard._id)
          clonedActiveColumn.cardOrderIds = clonedActiveColumn.cards.map(card => card._id)

          // khi đã kéo card cuối ra khỏi column cần them dummy card vào
          if (isEmpty(clonedActiveColumn.cards)) {
            clonedActiveColumn.cards = [generatePlaceholderCard(clonedActiveColumn)]
            clonedActiveColumn.cardOrderIds = clonedActiveColumn.cards.map(card => card._id)
          }
        }

        if (clonedOverColumn) {
          // kiểm tra xem card đang kéo có tồn tại ở over column chưa, nếu có thì phải xóa trước
          clonedOverColumn.cards = clonedOverColumn.cards.filter(card => card._id !== activeCard._id)

          // xóa dummy card ra khỏi over column
          clonedOverColumn.cards = clonedOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

          // insert active card vao vi tri trong over column
          clonedOverColumn.cards = clonedOverColumn.cards.toSpliced(newCardIndex, 0, activeCard)

          clonedOverColumn.cardOrderIds = clonedOverColumn.cards.map(card => card._id)

          // update column id cho card vừa được insert (ko co se di duoc ko ve duoc)
          const clonedActiveCardIndex = clonedOverColumn.cards.findIndex(card => card._id === activeCard._id)
          const clonedActiveCard = cloneDeep(clonedOverColumn.cards[clonedActiveCardIndex])
          if (clonedActiveCardIndex !== -1) {
            clonedActiveCard.columnId = clonedOverColumn._id
            clonedOverColumn.cards[clonedActiveCardIndex] = clonedActiveCard
          }
        }

        // DISPATCH ACTION
        dispatch(boardSlice.actions.moveCard(clonedColumns))

        // sau đó gọi API để update các columns ở handle drag end
      }
    }
  }

  let dndOrderedColumnsDragEnd = []
  const handleDragEnd = (e) => {
    const { active, over } = e
    // if (!active || !over) return
    if (activeDragItemType === ITEM_TYPE.CARD) {
      if (!active || !over) return

      const activeCard = activeDragItemData
      const overCard = over.data.current

      const overColumn = findColumnByCardId(overCard._id)

      //nếu kéo thả card trong cùng column
      if (columnBeforeDrag._id === overCard.columnId && activeCard._id !== overCard._id) {
        // tìm column
        const targetColumn = findColumnByCardId(activeCard._id)
        // tìm index của 2 cards
        const oldIndex = targetColumn?.cards?.findIndex(card => card._id === activeCard._id)
        const newIndex = targetColumn?.cards?.findIndex(card => card._id === overCard._id)
        //xếp lại thứ tự cards trong column
        const dndOrderedCards = arrayMove(targetColumn?.cards, oldIndex, newIndex)
        const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

        const clonedColumns = cloneDeep(board.columns)
        const clonedColumn = clonedColumns.find(column => column._id === targetColumn._id)
        clonedColumn.cards = dndOrderedCards
        clonedColumn.cardOrderIds = dndOrderedCardIds

        // DISPATCH ACTION UPDATE REDUX STORE
        dispatch(boardSlice.actions.moveCard(clonedColumns))

        // CALL API
        updateColumnDetailsAPI(clonedColumn._id, {
          cardOrderIds: dndOrderedCardIds
        })
      }

      //nếu kéo thả card khác column
      if (columnBeforeDrag._id !== overColumn._id) {
        // index của over card trong over column
        const overColumnCardIndex = overColumn?.cards.findIndex(card => card._id === overCard._id)

        // tính index của active card trong over column (cop từ thư viện dnd)
        const isBelowOverItem = active.rect.current.translated &&
              active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        const newCardIndex = overColumnCardIndex >= 0
          ? overColumnCardIndex + modifier
          : overColumn?.cards?.length + 1

        const clonedColumns = cloneDeep(board.columns)
        const clonedActiveColumn = clonedColumns.find(column => column._id === columnBeforeDrag._id)
        const clonedOverColumn = clonedColumns.find(column => column._id === overColumn._id)

        if (clonedActiveColumn) {
          clonedActiveColumn.cards = clonedActiveColumn.cards.filter(card => card._id !== activeCard._id)
          clonedActiveColumn.cardOrderIds = clonedActiveColumn.cards.map(card => card._id)

          // khi đã kéo card cuối ra khỏi column cần them dummy card vào
          if (isEmpty(clonedActiveColumn.cards)) {
            clonedActiveColumn.cards = [generatePlaceholderCard(clonedActiveColumn)]
            clonedActiveColumn.cardOrderIds = clonedActiveColumn.cards.map(card => card._id)
          }
        }

        if (clonedOverColumn) {
          // kiểm tra xem card đang kéo có tồn tại ở over column chưa, nếu có thì phải xóa trước
          clonedOverColumn.cards = clonedOverColumn.cards.filter(card => card._id !== activeCard._id)

          // xóa dummy card ra khỏi over column
          clonedOverColumn.cards = clonedOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

          // insert active card vao vi tri trong over column
          clonedOverColumn.cards = clonedOverColumn.cards.toSpliced(newCardIndex, 0, activeCard)

          clonedOverColumn.cardOrderIds = clonedOverColumn.cards.map(card => card._id)

          // update column id cho card vừa được insert (ko co se di duoc ko ve duoc)
          const clonedActiveCardIndex = clonedOverColumn.cards.findIndex(card => card._id === activeCard._id)
          const clonedActiveCard = cloneDeep(clonedOverColumn.cards[clonedActiveCardIndex])
          if (clonedActiveCardIndex !== -1) {
            clonedActiveCard.columnId = clonedOverColumn._id
            clonedOverColumn.cards[clonedActiveCardIndex] = clonedActiveCard
          }
        }

        // DISPATCH ACTION
        dispatch(boardSlice.actions.moveCard(clonedColumns))

        // API call
        moveCardToDifferentColumnAPI(board._id, {
          activeCardId: activeCard._id,
          activeColumnId: columnBeforeDrag._id,
          activeCardOrderIds: board.columns.find(c => c._id === columnBeforeDrag._id)?.cardOrderIds.filter(cardId => !cardId.includes('placeholder-card')),
          overColumnId: clonedOverColumn._id,
          overCardOrderIds: board.columns.find(c => c._id === clonedOverColumn._id)?.cardOrderIds.filter(cardId => !cardId.includes('placeholder-card'))
        })
      }
      return
    }

    if (activeDragItemType === ITEM_TYPE.COLUMN) {
      // if (overColumnBeforeDrag._id !== over.id) {
      if (over && active.id !== over.id) {
        const oldIndex = board.columns.findIndex(column => column._id === active.id)
        const newIndex = board.columns.findIndex(column => column._id === over.id)
        dndOrderedColumnsDragEnd = arrayMove(board.columns, oldIndex, newIndex)

        // DISPATCH ACTION UPDATE STORE
        dispatch(boardSlice.actions.moveColumn(dndOrderedColumnsDragEnd))

        // API
        updateBoardDetailsAPI(board._id, {
          columnOrderIds: dndOrderedColumnsDragEnd.map(c => c._id)
        })
        return
      }
      if (!over) {
        // API
        updateBoardDetailsAPI(board._id, {
          columnOrderIds: board.columnOrderIds
        })
      }
      return
    }
    // }

    setActiveDragItemData(null)
    setActiveDragItemType(null)
    setColumnBeforeDrag(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const customCollisionDetection = useCallback((args) => {
    if (activeDragItemType === ITEM_TYPE.COLUMN) {
      return rectIntersection({ ...args })
    }
    const pointerIntersections = pointerWithin(args)
    // console.log('pointerIntersections:', pointerIntersections)
    if (!pointerIntersections.length) return
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : closestCorners(args)

    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      // const intersectColumn = orderedColumns.find(column => column._id === overId)
      const intersectColumn = board.columns.find(column => column._id === overId)
      if (intersectColumn) {
        // console.log('over id before:', overId)
        // console.log('list cards:', intersectColumn.cardOrderIds)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (intersectColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        // console.log('over id after:', overId)
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  // }, [activeDragItemType, orderedColumns])
  }, [activeDragItemType, board.columns])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      // collisionDetection={activeDragItemType === ITEM_TYPE.COLUMN
      //   ? rectIntersection
      //   : closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.custom.boardContentHeight,
        padding: '10px 0 10px 0'
      }}>
        <ListColumns columns={board.columns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ITEM_TYPE.COLUMN &&
            <Column column_data={activeDragItemData}/>}
          {activeDragItemType === ITEM_TYPE.CARD &&
            <Card card_data={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
