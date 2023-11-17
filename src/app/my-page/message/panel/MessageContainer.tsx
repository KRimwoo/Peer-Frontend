'use client'

import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData } from '@/types/IMessage'
import useSelectCheckBox from '@/hook/useSelectCheckbox'
import useToast from '@/hook/useToast'
import MessageList from './MessageList'
import useMessageListState from '@/states/useMessageListState'
import { SearchBar, ManageBar } from './MessageBar'

interface IMessageContainerProps {
  originalMessageData: IMessageListData[] | undefined
  error: any
  isLoading: boolean
  isPC: boolean
}

const MessageContainer = ({
  originalMessageData,
  error,
  isLoading, // isPC,
}: IMessageContainerProps) => {
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [isManageMode, setIsManageMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const {
    selectedSet: selectedUsers,
    isSelectedAll,
    selectAll,
    unselectAll,
    toggleSelect,
  } = useSelectCheckBox(new Set<number>())

  const axiosInstance = useAxiosWithAuth()
  const { messageList, setMessageList } = useMessageListState()

  useEffect(() => {
    if (isManageMode) unselectAll()
  }, [isManageMode])

  useEffect(() => {
    if (originalMessageData) setMessageList(originalMessageData)
    else setMessageList([])
  }, [originalMessageData])

  // event handler

  const handleMessageSearch = useCallback(() => {
    // NOTE : 검색어가 없는 경우에는 모든 메시지를 보여준다?
    if (!originalMessageData) return
    if (!searchKeyword) setMessageList(originalMessageData)
    else
      setMessageList(
        originalMessageData.filter((message) => {
          return message.targetNickname.includes(searchKeyword)
        }),
      )
  }, [originalMessageData, searchKeyword])

  const handleDelete = () => {
    const requestBody = Array.from(selectedUsers).map((targetId) => ({
      targetId,
    }))
    axiosInstance
      .delete('/api/v1/message/delete-message', {
        data: {
          target: requestBody,
        },
      })
      .then((response: AxiosResponse<IMessageListData[]>) => {
        setMessageList(response.data)
        setIsManageMode(false)
      })
      .catch(() => {
        openToast()
      })
  }

  return (
    <>
      <Stack spacing={2}>
        {isManageMode ? (
          <ManageBar
            isSelectedAll={isSelectedAll(messageList)}
            handleSelectAll={() =>
              selectAll(messageList.map((message) => message.targetId))
            }
            handleUnselectAll={unselectAll}
            handleDelete={handleDelete}
          />
        ) : (
          <SearchBar
            setSearchKeyword={setSearchKeyword}
            setIsManageMode={setIsManageMode}
            handleMessageSearch={handleMessageSearch}
          />
        )}
        <MessageList
          messageList={messageList}
          state={{ isManageMode, isLoading, error }}
          selectedUsers={selectedUsers}
          toggleSelectUser={toggleSelect}
        />
        <CuToast open={isOpen} onClose={closeToast} severity="error">
          <Typography>삭제에 실패하였습니다.</Typography>
        </CuToast>
      </Stack>
    </>
  )
}

export default MessageContainer
