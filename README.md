# 바이브코딩으로 함께하는 3학년 분수 마스터하기! 🎮

초등학교 3학년 분수 단원을 위한 교육 게임입니다.

## 🎯 기능

1. **분수 분류하기**: 드래그 앤 드롭으로 진분수, 가분수, 대분수를 분류
2. **크기 비교하기**: 두 분수의 크기를 비교하고 서술형으로 설명
3. **응답 확인**: 학습자의 모든 응답 내용을 확인하여 채점 가능
4. **데이터 저장**: Supabase를 통해 학습 데이터 저장

## 🚀 시작하기

### 필요 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env` 파일을 생성하고 Supabase 정보를 입력하세요:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase 테이블 설정

1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase_schema.sql` 파일의 내용을 실행하여 테이블 생성

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 📦 배포 (Vercel)

1. GitHub에 프로젝트 푸시
2. Vercel에 프로젝트 연결
3. 환경 변수 설정 (Vercel 대시보드에서)
4. 배포 완료!

## 🛠 기술 스택

- React 18
- Vite
- Tailwind CSS
- Supabase
- Vercel (배포)

## 📝 데이터베이스 스키마

학습 기록은 다음 정보를 저장합니다:
- 학생 이름
- 분류 게임 점수
- 비교 게임 점수
- 총점
- 분류 게임 응답 (JSON)
- 비교 게임 응답 (JSON)
- 생성 시간

## 📄 라이선스

MIT

