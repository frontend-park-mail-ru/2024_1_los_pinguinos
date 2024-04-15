function handleBackground(path) {
    const body = document.body;
    let url = path.slice(1,path.length);
    if (path=== '/') {
      url = 'landing';
    }
    if (!url) {
      url = '404';
    }
    if (url !== 'main' && url !== 'profile' && url !== 'matches') {
      body.style.backgroundSize = 'cover';
    }
    body.style.backgroundImage = `var(--background--${url})`;
}
export default handleBackground;
