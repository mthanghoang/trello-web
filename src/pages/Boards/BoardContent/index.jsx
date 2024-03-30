import Box from '@mui/system/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorters'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCenter,
  closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ITEM_TYPE = {
  COLUMN: 'ITEM_TYPE_COLUMN',
  CARD: 'ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
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

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    // arrange the columns based on column order
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (e) => {
    // console.log(e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current?.columnId
      ? ITEM_TYPE.CARD
      : ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
  }

  const handleDragOver = (e) => {
    const { active, over } = e

    if (!active || !over) return

    if (activeDragItemType === ITEM_TYPE.CARD) {
      const activeCard = activeDragItemData
      const overCard = over.data.current
      console.log('bd keo')
      console.log('over item:', overCard)

      // if (!overItem.columnId) {
      //   console.log('collide voi column')
      //   const activeColumn = findColumnByCardId(activeCard._id)
      //   setOrderedColumns(originColumns => {
      //     const clonedColumns = cloneDeep(originColumns)
      //     const clonedActiveColumn = clonedColumns.find(column => column._id === activeColumn._id)
      //     const clonedOverColumn = clonedColumns.find(column => column._id === overItem._id)

      //     if (clonedActiveColumn) {
      //       clonedActiveColumn.cards = clonedActiveColumn.cards.filter(card => card._id !== activeCard._id)
      //       clonedActiveColumn.cardOrderIds = clonedActiveColumn.cards.map(card => card._id)
      //     }
      //     if (clonedOverColumn) {
      //       // kiểm tra xem card đang kéo có tồn tại ở over column chưa, nếu có thì phải xóa trước
      //       clonedOverColumn.cards = clonedOverColumn.cards.filter(card => card._id !== activeCard._id)

      //       // insert active card vao vi tri trong over column
      //       clonedOverColumn.cards = clonedOverColumn.cards.toSpliced(0, 0, activeCard)

      //       clonedOverColumn.cardOrderIds = clonedOverColumn.cards.map(card => card._id)

      //       // update column id cho card vừa được insert (ko co se di duoc ko ve duoc)
      //       const clonedActiveCard = clonedOverColumn.cards.find(card => card._id === activeCard._id)
      //       clonedActiveCard.columnId = clonedOverColumn._id
      //     }
      //     console.log('ds card cua column cu:', clonedActiveColumn.cards)
      //     console.log('ds card cua column moi:', clonedOverColumn.cards)
      //     return clonedColumns
      //   })
      //   return
      // }

      // xử lý khi 2 cards khác column
      if (activeCard.columnId !== overCard.columnId) {
        // tìm column tương ứng của từng card
        const activeColumn = findColumnByCardId(activeCard._id)
        const overColumn = findColumnByCardId(overCard._id)
        if (!overColumn) return
        console.log('over column:', overColumn)
        console.log('over card:', overCard)

        setOrderedColumns(originColumns => {
          // index của over card trong over column
          const overColumnCardIndex = overColumn?.cards.findIndex(card => card._id === overCard._id)
          console.log('overColumnCardIndex:', overColumnCardIndex)

          // tính index của active card trong over column (cop từ thư viện dnd)
          const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0
          const newCardIndex = overColumnCardIndex >= 0
            ? overColumnCardIndex + modifier
            : overColumn?.cards?.length + 1
          console.log('new index:', newCardIndex)

          const clonedColumns = cloneDeep(originColumns)
          const clonedActiveColumn = clonedColumns.find(column => column._id === activeColumn._id)
          const clonedOverColumn = clonedColumns.find(column => column._id === overColumn._id)

          if (clonedActiveColumn) {
            clonedActiveColumn.cards = clonedActiveColumn.cards.filter(card => card._id !== activeCard._id)
            clonedActiveColumn.cardOrderIds = clonedActiveColumn.cards.map(card => card._id)

            // khi đã kéo card cuối ra khỏi column cần them dummy card vào
            if (isEmpty(clonedActiveColumn.cards)) {
              clonedActiveColumn.cards = [generatePlaceholderCard(clonedActiveColumn)]
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
            const clonedActiveCard = clonedOverColumn.cards.find(card => card._id === activeCard._id)
            clonedActiveCard.columnId = clonedOverColumn._id
          }
          console.log('ds card cua column cu:', clonedActiveColumn.cards)
          console.log('ds card cua column moi:', clonedOverColumn.cards)
          return clonedColumns
        })
      }
    }
  }

  const handleDragEnd = (e) => {
    const { active, over } = e
    if (!active || !over) return

    if (activeDragItemType === ITEM_TYPE.CARD) {
      // console.log('keo tha card')
      const activeCard = activeDragItemData
      const overCard = over.data.current

      //nếu kéo thả card trong cùng column
      if (activeCard.columnId === overCard.columnId) {
        // tìm column
        const targetColumn = findColumnByCardId(activeCard._id)
        // tìm index của 2 cards
        const oldIndex = targetColumn?.cards?.findIndex(card => card._id === activeCard._id)
        const newIndex = targetColumn?.cards?.findIndex(card => card._id === overCard._id)
        //xếp lại thứ tự cards trong column
        const dndOrderedCards = arrayMove(targetColumn?.cards, oldIndex, newIndex)

        // update state cho orderedColumns
        setOrderedColumns(originColumns => {
          const clonedColumns = cloneDeep(originColumns)
          // tìm column
          const clonedColumn = clonedColumns.find(column => column._id === targetColumn._id)

          clonedColumn.cards = dndOrderedCards
          clonedColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return clonedColumns
        })
      }
      //nếu kéo thả card khác column
      // if (activeCard.columnId !== overCard.columnId) {
      //   // tìm over column
      //   const overColumn = findColumnByCardId(overCard._id)

      //   // update column id cho card mới được thêm vào over column
      //   setOrderedColumns(originColumns => {
      //     const clonedColumns = cloneDeep(originColumns)
      //     const clonedOverColumn = clonedColumns.find(column => column._id =)
      //   })
      // }
      return
    }

    if (activeDragItemType === ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // console.log('dragged and dropped')
        const oldIndex = orderedColumns.findIndex(column => column._id === active.id)
        const newIndex = orderedColumns.findIndex(column => column._id === over.id)
        // const newIndex = orderedColumns.findIndex(column => column._id === findColumnByCardId(over.id)._id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        setOrderedColumns(dndOrderedColumns)

        // update the columnOrderIds to DB (used for future API calls)
        board.columnOrderIds = dndOrderedColumns.map(column => column._id)
        // console.log('Column order sau khi dnd: ', board.columnOrderIds)
        return
      }
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
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
        <ListColumns columns={orderedColumns}/>
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
