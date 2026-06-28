// VCard 생성 및 다운로드
function downloadVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:김경민
TITLE:Brand Partner
TEL;TYPE=CELL:010-9057-3970
EMAIL:info@lavalabs.co.kr
ORG:LAVA LABS
URL:https://lavalabs.co.kr
ADR;TYPE=WORK:;;일현로 47, 2층 Lava Labs;고양시;경기도;;
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '김경민_명함.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// 모달 관련 함수들
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// 희망 분야 직접 입력 토글
function toggleCustomFieldInput(select) {
    const customInput = document.getElementById('custom_project_field');
    if (select.value === 'custom') {
        customInput.style.display = 'block';
        customInput.required = false;
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
    }
}

// 미팅 장소 직접 입력 토글
function toggleCustomLocationInput(select) {
    const customInput = document.getElementById('custom_meeting_location');
    if (select.value === 'custom') {
        customInput.style.display = 'block';
        customInput.required = false;
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
    }
}

// 클라이언트 구분 직접 입력 토글
function toggleCustomClientInput(select) {
    const customInput = document.getElementById('custom_client_type');
    if (select.value === 'custom') {
        customInput.style.display = 'block';
        customInput.required = false;
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
    }
}

// EmailJS 초기화
emailjs.init('p42-VpAOVAyoRBlj6');

// 문의하기 폼 제출
function submitContactForm(event) {
    event.preventDefault();
    
    // 필수 입력값 검증
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e57373';
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }
    
    // 체크박스 검증
    const checkboxes = form.querySelectorAll('input[name="contact_preference"]:checked');
    if (checkboxes.length === 0) {
        alert('희망 연락 수단을 하나 이상 선택해주세요.');
        return;
    }
    
    // 폼 데이터 수집
    const formData = {
        user_name: form.user_name.value,
        user_email: form.user_email.value,
        user_phone: form.user_phone.value || '미입력',
        client_type: form.client_type.value === 'custom' ? form.custom_client_type.value : form.client_type.value,
        project_field: form.project_field.value === 'custom' ? form.custom_project_field.value : form.project_field.value,
        budget: form.budget.value || '미입력',
        timeline: form.timeline.value || '미입력',
        meeting_location: form.meeting_location.value === 'custom' ? form.custom_meeting_location.value : form.meeting_location.value,
        contact_preference: Array.from(checkboxes).map(cb => cb.value).join(', '),
        message: form.message.value
    };

    // 로딩 표시
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
    submitBtn.disabled = true;

    // EmailJS로 전송
    emailjs.send('service_juabonc', 'template_swo1fzm', formData)
        .then(function() {
            // 관리자에게 문의 내용 전송 후, 사용자에게 확인 이메일 발송
            const userEmailData = {
                user_name: formData.user_name,
                user_email: formData.user_email,
                project_field: formData.project_field || '미입력',
                budget: formData.budget || '미입력',
                timeline: formData.timeline || '미입력'
            };
            return emailjs.send('service_juabonc', 'template_u2ljxck', userEmailData);
        })
        .then(function() {
            alert('문의가 성공적으로 전송되었습니다!');
            closeContactModal();
            form.reset();
            // 커스텀 입력 필드 초기화
            document.querySelectorAll('[id^="custom_"]').forEach(input => {
                input.style.display = 'none';
                input.value = '';
            });
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert('문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        })
        .finally(function() {
            // 버튼 상태 복구
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
}

// 맞춤 메시지 표시
function showCustomMessage() {
    const messageElement = document.getElementById('customMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();
    const today = now.toLocaleDateString();
    
    let message = '';
    if (lastVisit === today) {
        message = '다시 찾아주셔서 감사합니다 :)';
    } else {
        const month = now.getMonth() + 1;
        const date = now.getDate();
        message = `${month}월 ${date}일, 오늘도 반가워요!`;
    }
    
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    localStorage.setItem('lastVisit', today);
}

// 복사 기능
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('복사되었습니다!');
        });
    } else {
        // fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('복사되었습니다!');
    }
}

// 명함 공유 기능 (Web Share API)
function shareCard() {
    const shareData = {
        title: 'LAVA LABS - 김경민',
        text: '김경민 | Brand Partner\n010-9057-3970\ninfo@lavalabs.co.kr\n경기도 고양시 일산서구 일현로 47, 2층 Lava Labs',
        url: window.location.href
    };
    if (navigator.share) {
        navigator.share(shareData).catch(() => {
            alert('공유를 취소하셨거나 지원되지 않는 환경입니다.');
        });
    } else {
        alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
    }
}

// QR코드 생성 (QRCode.js 필요)
document.addEventListener('DOMContentLoaded', () => {
    showCustomMessage();
    // 모달 외부 클릭 시 닫기
    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeContactModal();
        }
    }
    // QR코드 생성
    if (window.QRCode) {
        const qrcodeEl = document.getElementById('qrcode');
        if (qrcodeEl) {
            // QRCode.js는 canvas 또는 img를 생성하므로, img 태그 대신 div 사용 권장
            const qrDiv = document.createElement('div');
            qrcodeEl.replaceWith(qrDiv);
            new QRCode(qrDiv, {
                text: window.location.href,
                width: 80,
                height: 80
            });
        }
    }
});

// FAQ 토글 기능
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    // 모든 FAQ 닫기
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.classList.remove('active');
        btn.nextElementSibling.classList.remove('active');
    });
    
    // 클릭된 FAQ 토글
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
    }
}