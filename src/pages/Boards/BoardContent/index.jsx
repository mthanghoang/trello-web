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
  defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
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
      ? ACTIVE_DRAG_ITEM_TYPE.CARD
      : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
  }

  const handleDragEnd = (e) => {
    console.log(e)
    const { active, over } = e
    if (!over) return

    // console.log('find over column id: ', findColumnByCardId(over.id)._id)

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
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart} >
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.custom.boardContentHeight,
        padding: '10px 0 10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
            <Column column_data={activeDragItemData}/>}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD &&
            <Card card_data={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
