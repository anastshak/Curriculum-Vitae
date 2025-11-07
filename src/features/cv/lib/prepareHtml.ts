const prepareCSS = () => {
  const style = document.createElement('style');

  style.textContent = `
    * {
      background-color: #fff !important;
      color: #000 !important;
    }
  `;

  const collectedStyles: Node[] = [];
  for (const sheet of document.styleSheets) {
    const { ownerNode } = sheet;
    if (!(ownerNode instanceof Element)) continue;

    if (ownerNode.tagName === 'LINK') {
      collectedStyles.push(ownerNode.cloneNode(true));
    }

    if (ownerNode.tagName === 'STYLE') {
      const newStyle = document.createElement('style');
      newStyle.textContent = [...sheet.cssRules].map((cssRule) => cssRule.cssText).join('\n');
      collectedStyles.push(newStyle);
    }
  }

  style.append(...collectedStyles);

  return style;
};

export default function prepareHtml(content: HTMLElement) {
  const page = document.createElement('div');
  page.append(content.cloneNode(true), prepareCSS());

  return page.outerHTML;
}
