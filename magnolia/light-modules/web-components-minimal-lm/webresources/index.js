import { LitElement, html } from 'https://unpkg.com/lit-element?module';
import { unsafeHTML } from 'https://unpkg.com/lit-html@latest/directives/unsafe-html.js?module';

// Headline
class Headline extends LitElement {
  static get properties() {
    return { text: { type: String } };
  }

  constructor() {
    super();
    this.text = '';
  }

  render() {
    return html`
      <h2 class="Headline">${this.text}</h2>
    `;
  }
}

customElements.define('wc-headline', Headline);

// Paragraph
class Paragraph extends LitElement {
  static get properties() {
    return { richText: { type: String } };
  }

  constructor() {
    super();
    this.richText = '';
  }

  render() {
    return html`
      <p class="Paragraph">${unsafeHTML(this.richText)}</p>
    `;
  }
}

customElements.define('wc-paragraph', Paragraph);

// Image
class Image extends LitElement {
  static get properties() {
    return { src: { type: String } };
  }

  constructor() {
    super();
    this.src = '';
  }

  render() {
    return html`
      <img class="Image" src=${this.src} alt="Etiam Purus" />
    `;
  }
}

customElements.define('wc-image', Image);

// List
class List extends LitElement {
  static get properties() {
    return { items: { type: String } };
  }

  constructor() {
    super();
    this.items = '';
  }

  render() {
    return html`
      <ul class="List">
        ${unsafeHTML(this.items)}
      </ul>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('wc-list', List);

// listItem
class listItem extends LitElement {
  static get properties() {
    return { text: { type: String } };
  }

  constructor() {
    super();
    this.text = '';
  }

  render() {
    return html`
      <li class="Item">${this.text}</li>
    `;
  }
}

customElements.define('wc-list-item', listItem);
