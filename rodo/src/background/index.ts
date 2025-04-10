
chrome.runtime.onInstalled.addListener(() => {
    console.log('Chrome Screen Recorder Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startRecording') {
        
        sendResponse({ status: 'Recording started' });
    } else if (request.action === 'stopRecording') {
       
        sendResponse({ status: 'Recording stopped' });
    }
});