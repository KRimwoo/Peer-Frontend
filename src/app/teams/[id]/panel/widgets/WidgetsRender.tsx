import { Box, IconButton, Stack, useMediaQuery } from '@mui/material'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import TmpCalenderWidget from '@/app/teams/[id]/panel/widgets/TmpCalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TmpTextWidget from '@/app/teams/[id]/panel/widgets/TmpTextWidget'
import TmpImageWidget from '@/app/teams/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactGridLayout, {
  Layout,
  Responsive,
  WidthProvider,
} from 'react-grid-layout'
import {
  ITeamDnDLayout,
  IWidget,
  SizeType,
  WidgetType,
} from '@/types/ITeamDnDLayout'
import CuButton from '@/components/CuButton'
import useToast from '@/hook/useToast'
import useAxiosWithAuth from '@/api/config'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CuTextModal from '@/components/CuTextModal'
import IToastProps from '@/types/IToastProps'
import { BrowserView } from 'react-device-detect'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface IWidgetsRenderProps {
  id: number | string
  data: ITeamDnDLayout | undefined
  type: WidgetType
  size: SizeType
  isDropping: boolean
  droppingItem: ReactGridLayout.CoreProps['droppingItem']
  edit: boolean
  setEdit: (edit: boolean) => void
  children?: React.ReactNode
}
export const WIDGET_WIDTH = 209

const WidgetsRender = ({
  id,
  data,
  type,
  size,
  isDropping,
  droppingItem,
  edit,
  setEdit,
  children,
}: IWidgetsRenderProps) => {
  const [index, setIndex] = useState(0)

  /* 초기 widget값을 만드는 함수 */
  const setInitWidgets: IWidget[] = useMemo(() => {
    if (!data) return []
    return data?.widgets?.map((widget, index) => {
      if (index === data?.widgets?.length - 1) setIndex(index)

      return {
        ...widget,
        grid: {
          ...widget.grid,
          i: index.toString(),
        },
      }
    })
  }, [data])

  const [widgets, setWidgets] = useState<IWidget[]>(setInitWidgets)
  const [prevWidgets, setPrevWidgets] = useState<IWidget[] | null>(null)
  const [isOpen, setOpen] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const { CuToast, isOpen: toastOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<IToastProps>(
    {} as IToastProps,
  )
  const isOverTablet = useMediaQuery('(min-width:700px)')

  /* widget 가져오기 */
  const getWidget = useCallback(
    (type: WidgetType, wgData: any, wgSize: SizeType) => {
      switch (type) {
        case 'notice':
          return <TmpNoticeWidget data={wgData} size={wgSize} />
        case 'board':
          return <TmpBoardWidget data={wgData} size={wgSize} />
        case 'calender':
          return <TmpCalenderWidget data={wgData} size={wgSize} />
        case 'attendance':
          return <TmpAttendWidget data={wgData} size={wgSize} />
        case 'text':
          return <TmpTextWidget data={wgData} size={wgSize} />
        case 'image':
          return <TmpImageWidget data={wgData} size={wgSize} />
        case 'linkTable':
          return <TmpLinkWidget data={wgData} size={wgSize} />
        default:
          return null
      }
    },
    [],
  )

  /* 지정된 레이아웃에서 벗어나지 않았는지 확인 */
  const isValidLayout = (newLayout: Layout[]) => {
    const checkX = newLayout.some((item) => item?.x + item?.w > 4)
    if (checkX) return false
    const checkY = newLayout.some((item) => item?.y + item?.h > 4)
    if (checkY) return false
    return true
  }

  /*
   * 현재 react-grid-layout에서 전체 height를 제한하는 코드가 없음
   * onDrop시에는 우리가 직접 해당 아이템을 넣는 방식이기 때문에 widgets 배열에 넣지 않는 방식으로 제한 가능
   * 그러나 onLayoutChange시에는 react-grid-layout에서 자동으로 아이템을 넣는 방식이기 때문에 제한 불가능
   * 따라서 최대 높이를 제한하기 위해 위젯이 추가될 때마다 height를 계산하여 height가 제한 값을 넘은 경우 다시 재조정해줘야함
   */
  useEffect(() => {
    if (prevWidgets) {
      setWidgets(prevWidgets)
    }
  }, [prevWidgets])

  /* 드롭 시 호출 */
  const onDrop = useCallback(
    (layout: Layout[], layoutItem: Layout) => {
      if (!edit) return
      if (!isValidLayout(layout)) return
      setWidgets([
        {
          key: index,
          grid: {
            ...layoutItem,
            i: index.toString(),
          },
          type,
          size,
          createdAt: new Date(),
          updatedAt: new Date(),
          data: null,
        },
        ...widgets,
      ])
      setIndex(index + 1)
    },
    [widgets, index, type, size, edit],
  )

  /* 레이아웃이 변경될때마다 호출 */
  const onLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      //드롭중일 경우 이미 onDrop에서 처리하고 있으므로 처리x
      if (isDropping) return
      //레이아웃 범위를 넘어갈 시 처리
      if (!isValidLayout(currentLayout)) {
        setPrevWidgets(widgets)
      }
      const updatedCurrentWidget: IWidget[] = currentLayout.map(
        (grid: Layout, i: number) => ({
          ...widgets[i],
          grid,
          updatedAt: new Date(),
        }),
      )
      setWidgets(updatedCurrentWidget)
    },
    [isDropping, widgets],
  )

  /* 변경된 팀페이지 위젯 request */
  const handleSave = useCallback(async () => {
    try {
      const teamWidgetInfo = {
        teamId: id,
        type: 'team',
        widgets: widgets,
      }
      if (!data) {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/create`,
          teamWidgetInfo,
        )
      } else
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/update`,
          teamWidgetInfo,
        )
      setToastMessage({
        severity: 'success',
        message: '수정에 성공하였습니다.',
      })
      openToast()
      setOpen(false)
      setEdit(false)
    } catch (e) {
      console.log('e', e)
      setToastMessage({
        severity: 'error',
        message: '수정에 실패하였습니다.',
      })
      openToast()
    }
  }, [axiosInstance, data, id, openToast, setEdit, widgets])

  const removeWidget = useCallback(
    (idx: string) => {
      const newWidgets = widgets.filter((widget) => widget.grid.i !== idx)
      setWidgets(newWidgets)
    },
    [widgets],
  )

  return (
    <Box>
      {/*request와 관련된 toast*/}
      <CuToast
        severity={toastMessage?.severity}
        open={toastOpen}
        onClose={closeToast}
      >
        {toastMessage?.message}
      </CuToast>
      {/*확인 모달*/}
      <CuTextModal
        open={isOpen}
        onClose={() => setOpen(false)}
        title={'팀페이지 저장'}
        containedButton={{
          text: '확인',
          onClick: handleSave,
        }}
        textButton={{
          text: '취소',
          onClick: () => setOpen(false),
        }}
        content={'팀 페이지를 저장하시겠습니까?'}
      />
      <Stack spacing={2}>
        <BrowserView>
          {/* 팀페이지 수정 버튼 */}
          <Stack
            alignItems={'center'}
            direction={'row'}
            spacing={1}
            justifyContent={'flex-end'}
          >
            {edit && (
              <CuButton
                TypographyProps={{
                  variant: 'Body2Emphasis',
                }}
                message={'취소'}
                action={() => {
                  // 취소 시 최초의 widget 상태로 되돌림
                  setWidgets(setInitWidgets)
                  setEdit(!edit)
                }}
                variant={'outlined'}
              />
            )}
            <CuButton
              message={edit ? '저장' : '팀페이지 수정'}
              TypographyProps={{
                variant: 'Body2Emphasis',
              }}
              action={() => {
                if (edit) return setOpen(true)
                setEdit(!edit)
              }}
              variant={edit ? 'contained' : 'text'}
            />
          </Stack>
        </BrowserView>
        {/*toolbox 영역*/}
        {children}
        {/* react-grid-layout 영역 */}
        <Box bgcolor="background.secondary">
          <ResponsiveGridLayout
            // isBounded={true}
            className="layout"
            margin={[12, 12]}
            breakpoints={{
              sm: 700,
              xs: 480,
            }}
            cols={{ sm: 4, xs: 2 }} //그리드의 열 수. pc면 4, 모바일이면 2
            maxRows={4}
            rowHeight={WIDGET_WIDTH} //그리드 항목의 높이
            onDrop={onDrop}
            isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
            onLayoutChange={onLayoutChange}
            isResizable={false}
            droppingItem={droppingItem}
            style={{
              height: edit
                ? isOverTablet
                  ? 4 * WIDGET_WIDTH + 100
                  : 8 * WIDGET_WIDTH + 100
                : undefined,
              borderRadius: '5px',
            }}
          >
            {widgets?.map(({ grid, type, size: wgSize, data: wgData }) => {
              return (
                <Box
                  key={grid.i}
                  data-grid={{ ...grid, isDraggable: edit }} //isDraggable 전체로 하는 방식있는데 안먹혀서 하나씩...
                  width={'100%'}
                  height={'100%'}
                >
                  {/*위젯 삭제 버튼*/}
                  {edit && (
                    <IconButton
                      onClick={() => removeWidget(grid?.i)}
                      aria-label="delete"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        top: -12,
                        right: -12,
                        zIndex: 9999,
                        color: 'white',
                        ':hover': {},
                      }}
                      size={'small'}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  )}
                  {/*위젯 type에 따라 렌더링*/}
                  {getWidget(type, wgData, wgSize)}
                </Box>
              )
            })}
          </ResponsiveGridLayout>
        </Box>
      </Stack>
    </Box>
  )
}

export default WidgetsRender
