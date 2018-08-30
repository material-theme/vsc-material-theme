import {IAccents} from '../../../../../extensions/interfaces/idefaults';

const templateSingleAccent = (accentName: string, accentColor: string): string => {
  const dashAccentName = accentName.toLowerCase().replace(/ /gi, '-');

  return `
    <label for="${dashAccentName}" data-color="${accentColor}">${accentName}</label>
    <input type="radio" name="accents" id="${dashAccentName}" value="${dashAccentName}" />
  `;
};

export default (containerSelector: string, accentsObject: IAccents, currentAccent: string) => {
  const container = document.querySelector(containerSelector);

  for (const accentKey of Object.keys(accentsObject)) {
    const el = document.createElement('div');
    el.innerHTML = templateSingleAccent(accentKey, accentsObject[accentKey]);

    if (accentKey === currentAccent) {
      el.setAttribute('selected', 'true');
      el.querySelector('input').setAttribute('checked', 'checked');
    }

    container.appendChild(el);
  }
};
