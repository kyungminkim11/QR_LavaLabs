# LAVA LABS 디지털 명함 웹사이트

배포 주소: https://kyungminkim11.github.io/QR_LavaLabs/

LAVA LABS의 디지털 명함 및 브랜드 허브 웹사이트입니다.

## 주요 기능

- 디지털 명함 정보 표시
- 연락처 VCard 다운로드
- 브랜드 링크 허브
- 소셜 미디어 연결
- 문의하기 폼
- 맞춤 메시지 표시

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
# Python을 사용하는 경우
python -m http.server 8000

# Node.js를 사용하는 경우
npx serve
```

4. 브라우저에서 `http://localhost:8000`으로 접속합니다.

## 배포

`main` 브랜치에 변경 사항이 반영되면 GitHub Actions가 GitHub Pages로 자동 배포합니다.

## 커스터마이징

- `styles.css`에서 색상 변수를 수정하여 테마를 변경할 수 있습니다.
- `script.js`에서 문의 폼과 명함 정보를 수정할 수 있습니다.
- `assets` 디렉토리에서 로고 이미지를 교체할 수 있습니다.

## 라이선스

© 2024 LAVA LABS. All rights reserved.