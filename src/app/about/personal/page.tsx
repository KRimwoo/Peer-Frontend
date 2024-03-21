'use client'

import DynamicToastViewer from '@/components/DynamicToastViewer'
import { Card, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

const PersonalPage = () => {
  const initialValue = `
 # **개인정보 처리 방침**
 작성일 : 2024년 1월 27일
 갱신일 : 2024년 1월 27일
 공고일 : 2024년 2월 5일 
 시행일 : 2024년 2월 5일
 ## 1. 서문
 ‘peer’, 이하 ‘피어’는 개발의 가능성을 믿고, 개발의 동료학습을 강화하기 위한 학습 도구이자 커뮤니티로써의 웹 어플리케이션 서비스를 의미합니다. 
 ‘개인정보 처리 방침’ 은 피어의 이용자가 안심하고 서비스를 이용할 수 있도록 피어 커뮤니티가 준수해야할 지침을 의미하며, 피어는 개인정보처리자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리 방침을 제공합니다. 
 피어는 이용자의 동의를 기반으로 개인정보를 수집 · 이용 및 제공하고 있으며 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장하기 위해 개인정보 처리 방침을 알기 쉽게 제공할 수 있도록 적극적인 노력을 기울이고 있습니다.
 ## 2. 개인정보 수집 목록 
 서비스 제공을 위해 수집하는 개인정보는 아래와 같습니다. 
 1. 회원 정보 또는 개별 서비스에서 프로필 정보(이메일, 이름, 별명, 프로필 사진)를 설정할 수 있습니다. 
 2. 회원가입 이후 소셜 로그인 기능으로 활성화 되었을 때, 이메일, 이름, 소셜 로그인시 필요한 정보 대조용 토큰을 수집합니다.
 3. 서비스 이용 과정에서 이용자의 개인 활동 정보가 저장될 수 있으며, 프로젝트 / 스터디 모집 글을 통해 주요 활동 지역, 각 프로젝트 / 스터디의 세부 정보(기간, 활동 방식)를 수집합니다. 
 4. ContactUs를 통한 상담 과정에서 웹 페이지, 메일, 전화 번호의 개인정보가 수집될 수 있습니다. 
 5. 오프라인 행사를 진행하게 되면서 이벤트, 세미나 등의 참가 과정에서 서면을 통한 개인정보의 수집도 있을 수 있습니다. 
 6. 피어와 제휴한 외부 기업, 단체, 개인으로부터 개인정보를 제공 받거나 제공할 수 있으며, 이러한 경우는 개인정보보호법에서 요구하는 동의 등의 절차를 거치게 됩니다. 
 향후 서비스를 목표로 하고 있는 아래 서비스를 위하여 추가적인 개인정보를 수집할 예정이며, 실질적으로 데이터 수집이 실행되었을 때, 이에 대해 사전 고지하고 수집할 예정입니다.
 - 인공지능 서비스 및 성향 분석 서비스를 위하여 자체 개발한 개인성향 분석 도구를 통해 수집되는 개인의 성향 정보
 - 상호 협업 능력, 커뮤니케이션 능력 등을 파악 및 서로의 매칭 정보를 판단하기 위한 업무 적응력 측정 정보
 - 동료학습, 프로젝트 추천 알고리즘을 위한 개인 선호 분야 정보
 - 지역 인증을 위한 하드웨어 GPS 신호 처리 및 지역 인증 정보
 이러한 개인정보에 대해서는 영향력에 따라 암호화 처리 로직 및 전달 과정에서도 암호화되어 전송됩니다. 
 ## 3. 개인정보의 이용 목적
 피어는 회원 관리, 서비스 개발 · 제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다. 
 회원 가입의 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원 관리를 위하여 개인정보를 이용합니다. 
 콘텐츠 등 제공하는 서비스(광고 포함)에 더하여 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다. 
 법령 및 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정 도용 및 부정 거래 방지, 약관 개정 등의 고지사항 전달, 분쟁 조정을 위한 기록 보존, 민원 처리 등 이용자 보호 서비스 운영을 위하여 개인정보를 이용합니다.   
 이벤트 정보 및 참여 기회, 광고성 정보 제공 등의 마케팅 및 프로모션 목적으로 개인정보를 이용합니다. 서비스 이용 기록과 접속 빈도, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다. 
 보안, 프라이버시, 안전을 위하여 이용자가 안심하고 서비스 이용을 위한 환경 구축을 위해 개인정보를 이용합니다. 
 피어는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계 작성, 과학적 연구, 공익적 기록 보존 등을 위하여 처리할 수 있습니다. 이 때 가명정보는 재식별 되지 않도록 추가정보와 분리하여 별도 저장, 관리하고 필요한 기술적 관리적 보호 조치를 취합니다.
 ## 4. 개인정보의 처리 및 삭제 프로세스
 개인정보는 탈퇴 시 1년 시점까지 해당 데이터를 관리 및 서비스 이용 향상의 목적으로 가지고 있습니다. 탈퇴 1년이 되는 시점이 되었을 때, 해당 유저에 대한 민감 정보들은 파기됩니다. 
 단, 서버 내 서비스의 원할한 이용, 타 이용자들에게 공개 가능한 정보들에 대해서는 히스토리를 남기기 위하여 일부 이용자의 정보를 더미 데이터로 해당 내역이 채워져 이용자 자체는 확인할 수 없도록 처리 됩니다. 
 정보 의 파기는 정기적으로 서버 내에 지정되어 있는 절차에 의거하여 데이터를 처리 합니다. 또한 이렇게 처리된 정보 처리의 기록을 남김으로써 정상적으로 처리 됨 여부를 피어 백엔드 개발팀은 정기적으로 확인합니다.  
 ## 5. 개인정보의 제3자 제공에 관한 사항
 피어는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 이용자가 외부 제휴 서비스를 이요하기 위해 개인정보 동의를 직접 한 경우, 그리고 관련 법령에 의거하여 피어에 개인정보 제출 의무가 발생한 경우, 이용자의 생명, 권익 보호에 있어 급박한 위험이 있어 이를 해소하기 위한 경우가 발생시 이에대해 개인정보를 제공할 수 있습니다. 
 또한 신규 서비스 및 외부 업체를 통한 제공될 수 있는 새로운 서비스가 생성되고 이에 개인정보가 필요할 시 이 내용은 사전에 고지되며 최초 이용 시 동의 여부를 통해 제 3자에 대한 개인정보 제공이 있을 수 있습니다. 
 ## 6. 이용자의 개인정보의 안전성 확보 의무에 관한 사항
 피어의 이용자들은 개인정보를 보호 받을 권리와 함께 스스로 이를 지키며 타인의 정보를 침해하는 등의 행위를 하지 않을 의무도 함께 가지고 있습니다. 비밀 번호를 포함한 개인의 정보가 유출되지 않도록 조심하고, 게시물을 포함한 타인의 개인정보를 훼손하거나 침범하지 않도록 유의하십시오.
 회원 입력한 정보가 부정확한 경우 발생하는 사고의 책임은 회원 자신에게 있으며, 회원의 개인정보 안전성을 지킬 의무를 소홀히 하여 발생한 사고에 대해서는 피어의 책임이 아닙니다. 회원은 항상 개인정보를 정확하고 최신 상태로 유지할 의무를 가집니다. 
 회원이 위 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『개인정보 보호법』, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 등의 관련 법률에 의거하여 민·형사적 처벌을 받을 수 있습니다. 
 또한 이러한 이용자의 의무에 대하여 피어는 항상 개인정보 관리에 있어 다음의 기능들을 안정적으로 유지하여 이용자의 개인정보 보호 의무를 지키도록 노력합니다. 
 - 회원은 언제든지 피어 로그인 후 자신의 개인정보를 조회 및 수정할 수 있습니다. 
 - 회원은 언제든지 회원 탈퇴 등을 통해 개인정보 수집 및 이용 동의를 철회 할 수 있습니다. 
 - 회원이 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.  
 ## 7. 개인정보 안전성 확보를 위한 피어의 조치사항
 피어는 회원의 개인정보 처리함에 있어 개인정보의 분실, 도난, 유출, 변조 또는 훼손이 발생하지 않도록 아래의 기술적·관리적 대책을 강구하고 있습니다. 
 ### 해킹등에 대한 대책
 피어는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막고자 최선을 다하고 있습니다. 암호화 통신, 데이터의 암호화, 서버 관리 도구들에 지속적인 모니터링 시스템을 통해 개인정보가 네트워크 상에서 유출되지 않도록 조치를 취하고 있습니다. 더불어 비정상적인 트래픽을 포함해 이용 서비스에 위해를 가하는 경우 등에 대해서도 조치를 취하여 외부로부터의 무단 접근을 통제하고 있습니다. 
 ### 개인정보 보호담당자 설립 및 개인정보 조치 규정
 피어는 개인정보보 보호 담당자를 두고 있으며, 개인정보에 대한 민감할 수 있는 사안들에 대해 항시 검토 및 조치 후 서비스에 적용합니다. 신규 기능 업데이트에 대하여 반드시 검사를 진행하며, 개인정보가 유출 될 수 있을 여지가 있는 기능에 대해서는 개발 및 검수 팀에서 통과 없이는 새로운 기능을 적용 시키지 않습니다. 
 ## 8. 개인정보 주체의 권익침해 발생에 대한 구제 방법
     
 피어는 이용자의 개인정보가 침해 당하거나, 권익이 피해를 발생했을 때 이에 대한 가능한한 방법을 통해 권익의 보호 및 악성 이용자에 대한 책임을 요구합니다. 
 1. 피어 이용자들을 위한 “서비스 이용 약관”을 준비하고 있습니다. 여기서는 이용자의 권리와 의무를 지정하며, 잘못된 행동들에 대한 이용약관을 준비하고 있으며, 이를 어길 시 이에 상응하는 서비스 이용의 불이익을 받게 되거나, 영구 정지 처리가 될 수 있습니다. 
     
 2. 피어 이용자들 중 권익침해를 발생시키는 행위가 적발되었을 때, 이에 대한 공공 기관으로부터의 요청에 대해 피어는 적극적으로 요구 사항을 수용함으로써 피해 받은 이용자의 권익 보호를 최우선으로 삼을 것입니다. 
     
 3. 피어 이용자들 중에 피해를 받았다고 판단되는 이용자가 있을 경우, 이에 대하여 문의를 주시면 피어 운영진은 피해에 대한 검토와 함께, 필요한 협력을 아끼지 않을 것입니다. 단, 이러한 피해 신고가 개인과 개인 간의 감정적 논쟁, 사적인 영역으로 판단 되는 경우에는 피해 접수가 거절 될 수 있음을 알립니다. 
     
 4. 피어 운영진은 피어 서비스 사용시에 문제를 해결하기 위한 연락 창구를 마련하고 있습니다. 해당 창구에 문의를 남기시면 피어 운영 규정에 의거하여 적절한 조치를 취할 수 있습니다.  
       
 ## 9. 개인정보 보호책임자 및 개인정보 열람청구 접수의 방법
     
 피어는 개인정보 보호를 위하여 보호 책임자와 이에 대한 권익 보호를 위한 창구를 마련하고 있습니다. 
 1. 보호 책임자 : jujeon, haryu 
 2. 연락 이메일 : [42peer@gmail.com](mailto:42peer@gmail.com) 
 3. 문의 가능 시간 및 문의 절차 
   1. 문의 가능 시간 : 24시 언제든지     
   2. 접수 절차 시작 시간 : 매일 오전 8시 30분부터 접수된 문의 사항 중 처리되지 않은 것들에 한하여 순차 처리가 진행됩니다.**`

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">개인정보 처리 방침</Typography>
        <Typography variant="Caption">생성일자: 2024년 2월 5일</Typography>
        <Typography variant="Caption">수정일자: 없음</Typography>
      </Stack>
      <br />
      <Stack>
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <DynamicToastViewer initialValue={initialValue} />
        </Card>
      </Stack>
    </Card>
  )
}

export default PersonalPage