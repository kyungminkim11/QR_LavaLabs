# LAVA LABS 디지털 명함 웹사이트

운영 주소: https://qr.lavalabs.co.kr/

LAVA LABS의 디지털 명함 및 브랜드 허브 웹사이트입니다.

## 주요 기능

- 디지털 명함 정보 표시
- 연락처 VCard 다운로드
- 브랜드 링크 허브
- 소셜 미디어 연결
- 관련 LAVA LABS 페이지 연결
- QR 코드 및 공유 기능

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 아이콘
- Google Fonts (Noto Sans KR)

## 설치 및 실행

1. 저장소를 클론합니다:

```bash
git clone https://github.com/kyungminkim11/QR_LavaLabs.git
```

2. 프로젝트 디렉토리로 이동합니다:

```bash
cd QR_LavaLabs
```

3. 웹 서버를 통해 실행합니다:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve
```

4. 브라우저에서 `http://localhost:8000`으로 접속합니다.

## 배포 구조

```text
GitHub: kyungminkim11/QR_LavaLabs
└─ main 브랜치
   ↓ Netlify 자동 배포
Netlify: thunderous-strudel-cbfd6f
   ↓ 사용자 도메인
https://qr.lavalabs.co.kr/
```

- 운영 배포 브랜치: `main`
- Netlify 게시 디렉터리: 저장소 루트 (`.`)
- 별도 빌드 명령 없음
- 운영 변경은 미리보기 브랜치에서 검토한 뒤 `main`에 병합합니다.
- 미리보기 브랜치는 Netlify에 연결하지 않아 Netlify 배포 크레딧을 사용하지 않습니다.

## 미리보기

현재 작업 브랜치:

```text
preview-netlify-auto-deploy
```

GitHub 원본 파일을 정적 웹으로 렌더링하는 개발용 미리보기 링크를 사용합니다. 이 방식은 Netlify 배포를 실행하지 않습니다.

## 커스터마이징

- `styles.css`에서 색상 변수를 수정하여 테마를 변경할 수 있습니다.
- `script.js`에서 명함 정보와 상호작용을 수정할 수 있습니다.
- `assets` 디렉터리에서 로고 이미지를 교체할 수 있습니다.

## 라이선스

© 2026 LAVA LABS. All rights reserved.
