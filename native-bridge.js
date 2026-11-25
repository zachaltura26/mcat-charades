/* The browser version does not expose this bridge and keeps its existing behavior. */
(() => {
  const handler = window.webkit?.messageHandlers?.nativeAds;
  if (!handler) return;
  document.documentElement.classList.add('native-ios');
  window.HighYieldNative = {
    showAd: () => handler.postMessage({ action: 'show' }),
    privacy: () => handler.postMessage({ action: 'privacy' })
  };
  window.addEventListener('DOMContentLoaded', () => {
    const button = document.createElement('button');
    button.id = 'native-privacy-button';
    button.className = 'btn btn-secondary';
    button.textContent = 'Ad privacy choices';
    button.hidden = true;
    button.style.marginTop = '12px';
    button.onclick = async () => {
      button.disabled = true;
      try { await window.HighYieldNative.privacy(); }
      catch (_) { alert('Privacy choices are unavailable right now. Please try again.'); }
      finally { button.disabled = false; }
    };
    document.querySelector('.home-launch')?.append(button);
    window.updateNativePrivacy = required => { button.hidden = !required; };
    handler.postMessage({ action: 'ready' }).catch(console.warn);
  });
})();
