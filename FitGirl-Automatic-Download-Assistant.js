// ==UserScript==
// @name         FitGirl Automatic Download Assistant
// @name:es      Asistente de Descarga Automática FitGirl
// @name:zh      FitGirl 自动下载助手
// @name:fr      Assistant de Téléchargement Automatique FitGirl
// @name:de      FitGirl Automatischer Download-Assistent
// @name:ja      FitGirl 自動ダウンロードアシスタント
// @name:pt      Assistente de Download Automático FitGirl
// @name:ru      Автоматический Помощник Загрузки FitGirl
// @name:ko      FitGirl 자동 다운로드 도우미
// @name:it      Assistente di Download Automatico FitGirl
// @name:tr      FitGirl Otomatik İndirme Yardımcısı
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Automatically handles fuckingfast.co download links on FitGirl pages with multi-language support
// @description:es  Maneja automáticamente los enlaces de descarga de fuckingfast.co en páginas de FitGirl con soporte multiidioma
// @description:zh  自动处理 FitGirl 页面上的 fuckingfast.co 下载链接，支持多语言
// @description:fr  Gère automatiquement les liens de téléchargement fuckingfast.co sur les pages FitGirl avec support multilingue
// @description:de  Verwaltet automatisch fuckingfast.co Download-Links auf FitGirl-Seiten mit mehrsprachiger Unterstützung
// @description:ja  多言語サポート付きでFitGirlページのfuckingfast.coダウンロードリンクを自動処理
// @description:pt  Gerencia automaticamente links de download fuckingfast.co em páginas FitGirl com suporte multilíngue
// @description:ru  Автоматически обрабатывает ссылки для загрузки fuckingfast.co на страницах FitGirl с многоязычной поддержкой
// @description:ko  다국어 지원으로 FitGirl 페이지의 fuckingfast.co 다운로드 링크를 자동 처리
// @description:it  Gestisce automaticamente i link di download fuckingfast.co sulle pagine FitGirl con supporto multilingue
// @description:tr  FitGirl sayfalarında fuckingfast.co indirme bağlantılarını çoklu dil desteğiyle otomatik yönetir
// @author       xmtaha
// @match        *://fitgirl-repacks.site/*
// @match        *://*.fitgirl-repacks.site/*
// @match        *://fuckingfast.co/*
// @match        *://*.fuckingfast.co/*
// @grant        GM_openInTab
// @grant        window.close
// @grant        unsafeWindow
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const translations = {
        'en': {
            'autoDownloader': 'Automatic Download Assistant',
            'selectAll': 'Select All',
            'deselectAll': 'Deselect All',
            'downloadSelected': 'Download Selected',
            'opening': 'Opening sequentially...',
            'selectFirst': 'Please select files to download first!',
            'part': 'Part',
            'searchingButton': 'Searching for download button...',
            'waitingTimer': 'Preparing download, waiting for timer...',
            'downloadStarted': 'Download triggered!',
            'closingTab': 'Closing tab in {sec}s...',
            'cancelClose': 'Cancel Tab Close',
            'canceled': 'Tab close cancelled.',
            'buttonNotFound': 'Download button not found. Please check page.'
        },
        'tr': {
            'autoDownloader': 'Otomatik İndirme Yardımcısı',
            'selectAll': 'Tümünü Seç',
            'deselectAll': 'Tüm Seçimleri Kaldır',
            'downloadSelected': 'Seçilenleri İndir',
            'opening': 'Sırayla açılıyor...',
            'selectFirst': 'Lütfen önce indirilecek dosyaları seçin!',
            'part': 'Part',
            'searchingButton': 'İndirme butonu aranıyor...',
            'waitingTimer': 'İndirme hazırlanıyor, sayaç bekleniyor...',
            'downloadStarted': 'İndirme başlatıldı!',
            'closingTab': 'Sekme {sec} saniye içinde kapatılacak...',
            'cancelClose': 'Kapatmayı İptal Et',
            'canceled': 'Kapatma iptal edildi.',
            'buttonNotFound': 'İndirme butonu bulunamadı. Lütfen sayfayı kontrol edin.'
        },
        'es': {
            'autoDownloader': 'Asistente de Descarga Automática',
            'selectAll': 'Seleccionar Todo',
            'deselectAll': 'Deseleccionar Todo',
            'downloadSelected': 'Descargar Seleccionados',
            'opening': 'Abriendo secuencialmente...',
            'selectFirst': '¡Por favor selecciona archivos para descargar primero!',
            'part': 'Parte',
            'searchingButton': 'Buscando botón de descarga...',
            'waitingTimer': 'Preparando descarga, esperando temporizador...',
            'downloadStarted': '¡Descarga iniciada!',
            'closingTab': 'Cerrando pestaña en {sec}s...',
            'cancelClose': 'Cancelar cierre',
            'canceled': 'Cierre cancelado.',
            'buttonNotFound': 'Botón de descarga no encontrado.'
        },
        'zh': {
            'autoDownloader': '自动下载助手',
            'selectAll': '全选',
            'deselectAll': '取消全选',
            'downloadSelected': '下载选中项',
            'opening': '正在依次打开...',
            'selectFirst': '请先选择要下载的文件！',
            'part': '部分',
            'searchingButton': '正在查找下载按钮...',
            'waitingTimer': '正在准备下载，等待倒计时...',
            'downloadStarted': '下载已开始！',
            'closingTab': '将在 {sec} 秒后关闭标签页...',
            'cancelClose': '取消关闭',
            'canceled': '已取消关闭标签页。',
            'buttonNotFound': '未找到下载按钮，请检查页面。'
        },
        'fr': {
            'autoDownloader': 'Assistant de Téléchargement Automatique',
            'selectAll': 'Tout Sélectionner',
            'deselectAll': 'Tout Désélectionner',
            'downloadSelected': 'Télécharger Sélectionnés',
            'opening': 'Ouverture séquentielle...',
            'selectFirst': 'Veuillez d\'abord sélectionner les fichiers à télécharger !',
            'part': 'Partie',
            'searchingButton': 'Recherche du bouton de téléchargement...',
            'waitingTimer': 'Préparation du téléchargement, en attente du compte à rebours...',
            'downloadStarted': 'Téléchargement lancé !',
            'closingTab': 'Fermeture de l\'onglet dans {sec}s...',
            'cancelClose': 'Annuler la fermeture',
            'canceled': 'Fermeture annulée.',
            'buttonNotFound': 'Bouton de téléchargement introuvable.'
        },
        'de': {
            'autoDownloader': 'Automatischer Download-Assistent',
            'selectAll': 'Alle Auswählen',
            'deselectAll': 'Alle Abwählen',
            'downloadSelected': 'Ausgewählte Herunterladen',
            'opening': 'Sequenzielles Öffnen...',
            'selectFirst': 'Bitte wählen Sie zuerst Dateien zum Herunterladen aus!',
            'part': 'Teil',
            'searchingButton': 'Suche Download-Schaltfläche...',
            'waitingTimer': 'Download wird vorbereitet, Timer läuft...',
            'downloadStarted': 'Download ausgelöst!',
            'closingTab': 'Tab schließt in {sec}s...',
            'cancelClose': 'Schließen abbrechen',
            'canceled': 'Schließen abgebrochen.',
            'buttonNotFound': 'Download-Button nicht gefunden.'
        },
        'ja': {
            'autoDownloader': '自動ダウンロードアシスタント',
            'selectAll': 'すべて選択',
            'deselectAll': 'すべて選択解除',
            'downloadSelected': '選択項目をダウンロード',
            'opening': '順次開いています...',
            'selectFirst': '最初にダウンロードするファイルを選択してください！',
            'part': 'パート',
            'searchingButton': 'ダウンロードボタンを検索中...',
            'waitingTimer': '準備中、タイマーを待機中...',
            'downloadStarted': 'ダウンロードが開始されました！',
            'closingTab': '{sec}秒後にタブを閉じます...',
            'cancelClose': '閉じるのをキャンセル',
            'canceled': 'タブのクローズをキャンセルしました。',
            'buttonNotFound': 'ダウンロードボタンが見つかりません。'
        },
        'pt': {
            'autoDownloader': 'Assistente de Download Automático',
            'selectAll': 'Selecionar Tudo',
            'deselectAll': 'Desselecionar Tudo',
            'downloadSelected': 'Baixar Selecionados',
            'opening': 'Abrindo sequencialmente...',
            'selectFirst': 'Por favor, selecione os arquivos para baixar primeiro!',
            'part': 'Parte',
            'searchingButton': 'Procurando botão de download...',
            'waitingTimer': 'Preparando download, aguardando cronômetro...',
            'downloadStarted': 'Download iniciado!',
            'closingTab': 'Fechando aba em {sec}s...',
            'cancelClose': 'Cancelar fechamento',
            'canceled': 'Fechamento cancelado.',
            'buttonNotFound': 'Botão de download não encontrado.'
        },
        'ru': {
            'autoDownloader': 'Автоматический Помощник Загрузки',
            'selectAll': 'Выбрать Все',
            'deselectAll': 'Отменить Все',
            'downloadSelected': 'Скачать Выбранные',
            'opening': 'Открытие по порядку...',
            'selectFirst': 'Сначала выберите файлы для загрузки!',
            'part': 'Часть',
            'searchingButton': 'Поиск кнопки скачивания...',
            'waitingTimer': 'Подготовка к скачиванию, ожидание таймера...',
            'downloadStarted': 'Загрузка запущена!',
            'closingTab': 'Вкладка закроется через {sec}с...',
            'cancelClose': 'Отменить закрытие',
            'canceled': 'Закрытие отменено.',
            'buttonNotFound': 'Кнопка скачивания не найдена.'
        },
        'ko': {
            'autoDownloader': '자동 다운로드 도우미',
            'selectAll': '모두 선택',
            'deselectAll': '모두 선택 해제',
            'downloadSelected': '선택된 항목 다운로드',
            'opening': '순차적으로 여는 중...',
            'selectFirst': '먼저 다운로드할 파일을 선택하세요!',
            'part': '부분',
            'searchingButton': '다운로드 버튼 찾는 중...',
            'waitingTimer': '다운로드 준비 중, 타이머 대기 중...',
            'downloadStarted': '다운로드가 시작되었습니다!',
            'closingTab': '{sec}초 후 탭 닫기...',
            'cancelClose': '닫기 취소',
            'canceled': '탭 닫기가 취소되었습니다.',
            'buttonNotFound': '다운로드 버튼을 찾을 수 없습니다.'
        },
        'it': {
            'autoDownloader': 'Assistente di Download Automatico',
            'selectAll': 'Seleziona Tutto',
            'deselectAll': 'Deseleziona Tutto',
            'downloadSelected': 'Scarica Selezionati',
            'opening': 'Apertura sequenziale...',
            'selectFirst': 'Per favore seleziona prima i file da scaricare!',
            'part': 'Parte',
            'searchingButton': 'Ricerca pulsante di download...',
            'waitingTimer': 'Preparazione download, in attesa del timer...',
            'downloadStarted': 'Download avviato!',
            'closingTab': 'Chiusura scheda tra {sec}s...',
            'cancelClose': 'Annulla chiusura',
            'canceled': 'Chiusura annullata.',
            'buttonNotFound': 'Pulsante di download non trovato.'
        }
    };

    function getTranslator() {
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        const langCode = browserLang.split('-')[0];
        const dict = translations[langCode] || translations['en'];

        const trFunc = function(key, params = {}) {
            let str = dict[key] || translations['en'][key] || key;
            for (const [k, v] of Object.entries(params)) {
                str = str.replace(`{${k}}`, v);
            }
            return str;
        };

        Object.assign(trFunc, translations['en'], dict);
        return trFunc;
    }

    const t = getTranslator();

    // ==========================================
    // 1. FITGIRL REPACKS SITE HANDLING
    // ==========================================
    if (window.location.hostname.includes('fitgirl-repacks.site')) {
        const currentPath = window.location.pathname;
        const isMainPage = currentPath === '/' || currentPath === '' || 
                          currentPath === '/index.html' || 
                          currentPath.match(/^\/page\/\d+\/?$/);
        
        if (isMainPage) {
            return;
        }

        const checkInterval = setInterval(() => {
            const links = document.querySelectorAll('a[href*="fuckingfast.co"]');
            const entryContent = document.querySelector('.entry-content');

            if (links.length > 0 && entryContent) {
                clearInterval(checkInterval);

                if (document.getElementById('auto-downloader-container')) {
                    return;
                }

                const linkContainer = document.createElement('div');
                linkContainer.id = 'auto-downloader-container';
                linkContainer.style.marginTop = '20px';
                linkContainer.style.marginBottom = '20px';
                linkContainer.style.border = '2px solid #4CAF50';
                linkContainer.style.borderRadius = '5px';
                linkContainer.style.padding = '15px';
                linkContainer.style.backgroundColor = '#f0fff0';

                const title = document.createElement('h3');
                title.innerText = t.autoDownloader;
                title.style.marginTop = '0';
                linkContainer.appendChild(title);

                const listContainer = document.createElement('div');
                listContainer.style.display = 'flex';
                listContainer.style.flexDirection = 'column';
                listContainer.style.gap = '10px';

                links.forEach((link, index) => {
                    const originalUrl = link.href;
                    const fileName = originalUrl.split('#')[1] || `${t.part} ${index + 1}`;
                    const fileLabel = fileName.replace(/_/g, ' ');

                    const listItem = document.createElement('div');
                    listItem.style.display = 'flex';
                    listItem.style.alignItems = 'center';
                    listItem.style.gap = '8px';

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `download-item-${index}`;
                    checkbox.value = originalUrl;
                    checkbox.style.cursor = 'pointer';

                    const label = document.createElement('label');
                    label.htmlFor = `download-item-${index}`;
                    label.innerText = fileLabel;
                    label.style.cursor = 'pointer';

                    listItem.appendChild(checkbox);
                    listItem.appendChild(label);
                    listContainer.appendChild(listItem);
                });

                linkContainer.appendChild(listContainer);

                const selectAllButton = document.createElement('button');
                selectAllButton.innerText = t.selectAll;
                selectAllButton.style.marginTop = '10px';
                selectAllButton.style.padding = '8px 16px';
                selectAllButton.style.cursor = 'pointer';
                selectAllButton.style.border = '1px solid #2196F3';
                selectAllButton.style.borderRadius = '5px';
                selectAllButton.style.backgroundColor = '#2196F3';
                selectAllButton.style.color = 'white';
                selectAllButton.style.marginRight = '10px';

                selectAllButton.onmouseover = () => selectAllButton.style.backgroundColor = '#1976D2';
                selectAllButton.onmouseout = () => selectAllButton.style.backgroundColor = '#2196F3';

                let allSelected = false;
                selectAllButton.onclick = () => {
                    const checkboxes = document.querySelectorAll('#auto-downloader-container input[type="checkbox"]');
                    allSelected = !allSelected;
                    
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = allSelected;
                    });
                    
                    selectAllButton.innerText = allSelected ? t.deselectAll : t.selectAll;
                };

                linkContainer.appendChild(selectAllButton);

                const downloadAllButton = document.createElement('button');
                downloadAllButton.innerText = t.downloadSelected;
                downloadAllButton.style.marginTop = '15px';
                downloadAllButton.style.padding = '10px 20px';
                downloadAllButton.style.cursor = 'pointer';
                downloadAllButton.style.border = '1px solid #4CAF50';
                downloadAllButton.style.borderRadius = '5px';
                downloadAllButton.style.backgroundColor = '#4CAF50';
                downloadAllButton.style.color = 'white';

                downloadAllButton.onmouseover = () => downloadAllButton.style.backgroundColor = '#45a049';
                downloadAllButton.onmouseout = () => downloadAllButton.style.backgroundColor = '#4CAF50';

                downloadAllButton.onclick = async () => {
                    const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked');
                    if (checkedItems.length === 0) {
                        showMessage(t.selectFirst);
                        return;
                    }

                    downloadAllButton.disabled = true;
                    downloadAllButton.innerText = t.opening;

                    for (const item of checkedItems) {
                        const url = item.value;
                        await new Promise(resolve => {
                            GM_openInTab(url, { active: true });
                            // 1500ms delay to prevent overwhelming Cloudflare and browser pop-up checks
                            setTimeout(resolve, 1500);
                        });
                    }

                    downloadAllButton.disabled = false;
                    downloadAllButton.innerText = t.downloadSelected;
                };

                linkContainer.appendChild(downloadAllButton);
                entryContent.prepend(linkContainer);

                function showMessage(msg) {
                    const messageBox = document.createElement('div');
                    messageBox.style.cssText = `
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: #ffc107;
                        color: #333;
                        padding: 15px 30px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        z-index: 9999;
                        font-family: sans-serif;
                        opacity: 0;
                        transition: opacity 0.5s ease-in-out;
                    `;
                    messageBox.innerText = msg;
                    document.body.appendChild(messageBox);

                    setTimeout(() => {
                        messageBox.style.opacity = '1';
                    }, 10);

                    setTimeout(() => {
                        messageBox.style.opacity = '0';
                        messageBox.addEventListener('transitionend', () => {
                            messageBox.remove();
                        });
                    }, 3000);
                }

            }
        }, 1000);
    }

    // ==========================================
    // 2. FUCKINGFAST.CO HANDLING
    // ==========================================
    if (window.location.hostname.includes('fuckingfast.co')) {
        const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
        let downloadTriggered = false;
        let closeTimer = null;
        let countdownInterval = null;

        // UI badge to show live status and provide manual controls
        const statusBadge = document.createElement('div');
        statusBadge.id = 'fitgirl-assistant-status';
        statusBadge.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 9999999;
            background: rgba(30, 30, 30, 0.95);
            color: #ffffff;
            padding: 12px 18px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-width: 260px;
            border-left: 4px solid #4CAF50;
            pointer-events: auto;
        `;
        statusBadge.innerHTML = `
            <div style="font-weight: bold; display: flex; align-items: center; gap: 6px;">
                <span>⚡</span>
                <span>FitGirl Download Assistant</span>
            </div>
            <div id="fitgirl-status-text" style="font-size: 13px; color: #ddd;">${t('searchingButton')}</div>
            <div id="fitgirl-actions" style="display: none; margin-top: 4px;">
                <button id="fitgirl-cancel-btn" style="background: #e53935; color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('cancelClose')}</button>
            </div>
        `;

        function updateStatus(text, showCancel = false) {
            const statusText = statusBadge.querySelector('#fitgirl-status-text');
            const actions = statusBadge.querySelector('#fitgirl-actions');
            if (statusText) statusText.innerText = text;
            if (actions) actions.style.display = showCancel ? 'block' : 'none';
        }

        const appendBadge = () => {
            if (!document.getElementById('fitgirl-assistant-status')) {
                (document.body || document.documentElement).appendChild(statusBadge);
                const cancelBtn = statusBadge.querySelector('#fitgirl-cancel-btn');
                if (cancelBtn) {
                    cancelBtn.onclick = () => {
                        if (closeTimer) clearTimeout(closeTimer);
                        if (countdownInterval) clearInterval(countdownInterval);
                        updateStatus(t('canceled'), false);
                        statusBadge.style.borderLeftColor = '#2196F3';
                    };
                }
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', appendBadge);
        } else {
            appendBadge();
        }

        // Tab closing logic with countdown and safety window
        function scheduleTabClose(seconds = 10) {
            if (closeTimer) return;
            let remaining = seconds;
            updateStatus(`${t('downloadStarted')} ${t('closingTab', { sec: remaining })}`, true);

            countdownInterval = setInterval(() => {
                remaining--;
                if (remaining > 0) {
                    updateStatus(`${t('downloadStarted')} ${t('closingTab', { sec: remaining })}`, true);
                } else {
                    clearInterval(countdownInterval);
                }
            }, 1000);

            closeTimer = setTimeout(() => {
                clearInterval(countdownInterval);
                try {
                    window.close();
                } catch (e) {
                    console.log('[FitGirl Assistant] window.close error:', e);
                }
            }, seconds * 1000);
        }

        function triggerDirectDownload(url) {
            if (downloadTriggered) return;
            downloadTriggered = true;
            console.log('[FitGirl Assistant] Direct download URL triggered:', url);
            updateStatus(t('downloadStarted'), true);

            // Navigate current tab directly to download stream (prevents popup blocker)
            window.location.href = url;
            scheduleTabClose(10);
        }

        // 1. Intercept window.open on both window and unsafeWindow:
        // This is crucial because fuckingfast triggers window.open(), which browsers block when executed from scripts!
        function hookWindowOpen(targetWin) {
            if (!targetWin) return;
            const originalOpen = targetWin.open;
            targetWin.open = function(url, target, features) {
                if (url && typeof url === 'string') {
                    console.log('[FitGirl Assistant] window.open intercepted:', url);
                    triggerDirectDownload(url);
                    return targetWin;
                }
                return originalOpen ? originalOpen.apply(this, arguments) : null;
            };
        }

        hookWindowOpen(window);
        if (typeof unsafeWindow !== 'undefined' && unsafeWindow !== window) {
            hookWindowOpen(unsafeWindow);
        }

        // 2. Scan page HTML/scripts for direct download links
        function scanDirectLinkInDOM() {
            const html = document.documentElement.innerHTML;
            // Pattern 1: Direct link format (dl.fuckingfast.co or /dl/)
            const dlMatch = html.match(/https?:\/\/(?:[a-zA-Z0-9-]+\.)?fuckingfast\.co\/dl\/[^\s"'<>]+/i);
            if (dlMatch && dlMatch[0]) {
                return dlMatch[0];
            }
            // Pattern 2: window.open embedded in script tags
            const openMatch = html.match(/window\.open\s*\(\s*["']([^"']*(?:\/dl\/|fuckingfast)[^"']*)["']/i);
            if (openMatch && openMatch[1]) {
                return openMatch[1];
            }
            return null;
        }

        // 3. Find download button with comprehensive selectors
        function findDownloadButton() {
            const selectors = [
                'button.gay-button',
                'button.link-button',
                '.gay-button',
                '.link-button',
                'a.gay-button',
                'a.link-button',
                'button[hx-post*="/go"]',
                'a[hx-post*="/go"]',
                '[hx-post*="/go"]',
                '[hx-post]',
                'button.download',
                'a.download',
                'button#download',
                'a#download',
                '[class*="download-button"]',
                '[class*="download"]'
            ];

            for (const selector of selectors) {
                const el = document.querySelector(selector);
                if (el && isElementVisible(el)) {
                    return el;
                }
            }

            // Fallback: search all buttons and links for "DOWNLOAD" text
            const candidates = document.querySelectorAll('button, a, div[role="button"], input[type="button"], input[type="submit"]');
            for (const el of candidates) {
                const text = (el.innerText || el.textContent || el.value || '').trim().toUpperCase();
                if ((text === 'DOWNLOAD' || text.startsWith('DOWNLOAD') || text.includes('DOWNLOAD FILE')) && isElementVisible(el)) {
                    return el;
                }
            }

            return null;
        }

        function isElementVisible(el) {
            if (!el) return false;
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }

        function isButtonReady(btn) {
            if (!btn) return false;
            if (btn.disabled || btn.getAttribute('aria-disabled') === 'true' || btn.classList.contains('disabled')) {
                return false;
            }
            const text = (btn.innerText || btn.textContent || '').trim();
            // Wait if button displays a countdown timer
            if (/(wait|\b\d+\s*s\b|seconds|lütfen)/i.test(text) && !/download/i.test(text)) {
                return false;
            }
            return true;
        }

        // 4. Polling loop
        let attempts = 0;
        const maxAttempts = 40; // 40 seconds

        const interval = setInterval(() => {
            if (downloadTriggered) {
                clearInterval(interval);
                return;
            }

            appendBadge();
            attempts++;
            if (attempts > maxAttempts) {
                clearInterval(interval);
                updateStatus(t('buttonNotFound'), false);
                return;
            }

            // Step A: Check if direct URL is present in DOM / scripts
            const directUrl = scanDirectLinkInDOM();
            if (directUrl) {
                clearInterval(interval);
                triggerDirectDownload(directUrl);
                return;
            }

            // Step B: Find download button
            const downloadButton = findDownloadButton();
            if (downloadButton) {
                if (!isButtonReady(downloadButton)) {
                    updateStatus(t('waitingTimer'), false);
                    return;
                }

                clearInterval(interval);

                // If button has inline onclick with window.open
                const onclickAttr = downloadButton.getAttribute('onclick') || '';
                const onclickMatch = onclickAttr.match(/window\.open\s*\(\s*['"]([^'"]+)['"]/i);
                if (onclickMatch && onclickMatch[1]) {
                    triggerDirectDownload(onclickMatch[1]);
                    return;
                }

                // If it is a direct <a> anchor
                if (downloadButton.tagName === 'A' && downloadButton.href && 
                    !downloadButton.href.startsWith('javascript:') && 
                    !downloadButton.href.includes('#')) {
                    triggerDirectDownload(downloadButton.href);
                    return;
                }

                // Otherwise simulate click
                console.log('[FitGirl Assistant] Clicking download button:', downloadButton);
                downloadButton.click();
                downloadTriggered = true;
                updateStatus(t('downloadStarted'), true);
                scheduleTabClose(10);
            }
        }, 1000);
    }
})();
