<script>
import { TemplateAnnotations } from '@magnolia/template-annotations';

export const inEditorPreview = typeof window !== 'undefined' ? window.self !== window.top : false;

const insertComments = (node, commentOpen, commentClose) => {
  if (inEditorPreview && node) {
    node.parentNode.insertBefore(document.createComment(commentOpen), node);
    node.parentNode.insertBefore(document.createComment(commentClose), node.nextSibling);
  }
};

export const EditablePage = {
  name: 'EditablePage',
  props: ['content', 'config', 'templateDefinitions'],
  data() {
    return {
      pageTemplateId: this.content['mgnl:template'],
    };
  },
  provide() {
    return {
      config: this.config,
      templateDefinitions: this.templateDefinitions,
      pageTemplateId: this.pageTemplateId,
    };
  },
  mounted() {
    const templateDefinition = this.templateDefinitions[this.pageTemplateId];
    const commentOpen = TemplateAnnotations.getPageCommentString(this.content, templateDefinition);

    insertComments(this.$el, commentOpen, '/cms:page');
  },
  render(createElement) {
    const template = this.config.componentMappings[this.pageTemplateId];

    return template
      ? createElement(template, {
          props: this.content,
        })
      : null;
  },
};

export const EditableArea = {
  name: 'EditableArea',
  components: {
    EditableComponent,
  },
  inject: ['config', 'templateDefinitions', 'pageTemplateId'],
  props: ['content', 'parentTemplateId'],
  mounted() {
    const parentTemplateId = this.parentTemplateId || this.pageTemplateId;
    const templateDefinition = this.templateDefinitions[parentTemplateId];
    const commentOpen = TemplateAnnotations.getAreaCommentString(this.content, templateDefinition);

    insertComments(this.$el, commentOpen, '/cms:area');
  },
  render(createElement) {
    const nodes = this.content['@nodes'].map((nodeName) => this.content[nodeName]);

    return createElement(
      'div',
      null,
      nodes.map((node) => createElement(EditableComponent, { props: { content: node } }, null))
    );
  },
};

export const EditableComponent = {
  name: 'EditableComponent',
  inject: ['config', 'templateDefinitions', 'pageTemplateId'],
  props: ['content'],
  data() {
    return {
      componentTemplateId: this.content['mgnl:template'],
    };
  },
  mounted() {
    const templateDefinition = this.templateDefinitions[this.componentTemplateId];
    const commentOpen = TemplateAnnotations.getComponentCommentString(this.content, templateDefinition);

    insertComments(this.$el, commentOpen, '/cms:component');
  },
  render(createElement) {
    const template = this.config.componentMappings[this.componentTemplateId];

    return template
      ? createElement(template, {
          props: this.content,
        })
      : null;
  },
};

export default EditablePage;
</script>
