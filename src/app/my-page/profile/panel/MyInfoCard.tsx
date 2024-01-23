import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { ISkill, IUserProfileLink } from '@/types/IUserProfile'
import TitleBox from '@/components/TitleBox'

const MyInfoCard = ({
  linkList,
  skillList,
  setModalType,
  handleLogout,
}: {
  linkList: Array<IUserProfileLink>
  skillList: Array<ISkill>
  setModalType: (type: string) => void
  handleLogout: () => void
}) => {
  return (
    <TitleBox title="내 정보">
      <Skills setModalType={setModalType} skillList={skillList} />
      <ProfileLinksSection linkList={linkList} setModalType={setModalType} />
      <CuButton variant="text" action={handleLogout} message="로그아웃" />
    </TitleBox>
  )
}

export default MyInfoCard
