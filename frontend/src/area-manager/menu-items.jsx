const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'COMIC-DATA MANAGER',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'main-page',
          title: 'Main Page',
          type: 'item',
          icon: 'feather icon-home',
          url: '/manager',
        },
        {
          id: 'comic-manager',
          title: 'Comic Manager',
          type: 'collapse',
          icon: 'feather icon-layers',
          children: [
            {
              id: 'comic-list',
              title: 'Comic Index',
              type: 'item',
              icon: 'feather icon-book',
              url: '/manager/comic/comic-index',
            },
            {
              id: 'comic-author',
              title: 'Author Index',
              type: 'item',
              icon: 'feather icon-edit',
              url: '/manager/comic/author-index',
            },
            {
              id: 'comic-gerne',
              title: 'Gerne Index',
              type: 'item',
              icon: 'feather icon-edit',
              url: '/manager/comic/gerne-index',
            },
            {
              id: 'chapter-list',
              title: 'Chapter Manager',
              type: 'item',
              icon: 'feather icon-layers',
              url: '/manager/comic/chapter',
            },
          ],
        },
      ],
    },
    {
      id: 'ui-element',
      title: 'UI ELEMENT',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'components',
          title: 'Components',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/manager/basic/button',
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/manager/basic/badges',
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb & Pagination',
              type: 'item',
              url: '/manager/basic/breadcrumb',
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/manager/basic/collapse',
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/manager/basic/tabs',
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/manager/basic/typography',
            },
          ],
        },
      ],
    },
    {
      id: 'ui-forms',
      title: 'FORMS & TABLES',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'form-elements',
          title: 'Form Elements',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/manager/form',
        },
        {
          id: 'table',
          title: 'Table',
          type: 'item',
          icon: 'feather icon-server',
          url: '/manager/bootstrap',
        },
      ],
    },
    {
      id: 'chart-maps',
      title: 'CHART & MAPS',
      type: 'group',
      icon: 'icon-charts',
      children: [
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          icon: 'feather icon-pie-chart',
          url: '/manager/nvd3',
        },
        {
          id: 'maps',
          title: 'Maps',
          type: 'item',
          icon: 'feather icon-map',
          url: '/manager/map',
        },
      ],
    },
    {
      id: 'pages',
      title: 'PAGES',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger',
          },
          children: [
            {
              id: 'signup',
              title: 'Sign up',
              type: 'item',
              url: '/manager/auth/signup',
              target: true,
              breadcrumbs: false,
            },
            {
              id: 'signin',
              title: 'Sign in',
              type: 'item',
              url: '/manager/auth/signin',
              target: true,
              breadcrumbs: false,
            },
          ],
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          icon: 'feather icon-sidebar',
          url: '/manager/page',
          classes: 'nav-item',
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          icon: 'feather icon-book',
          url: 'https://codedthemes.gitbook.io/datta/',
          target: true,
          external: true,
        },
        {
          id: 'menu-level',
          title: 'Menu Levels',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'menu-level-1',
              title: 'Menu Level 1',
              type: 'item',
              url: '#',
            },
            {
              id: 'menu-level-2',
              title: 'Menu Level 2',
              type: 'collapse',
              children: [
                {
                  id: 'menu-level-2-1',
                  title: 'Menu Level 2.1',
                  type: 'item',
                  url: '#',
                },
                {
                  id: 'menu-level-2-2',
                  title: 'Menu Level 2.2',
                  type: 'collapse',
                  children: [
                    {
                      id: 'menu-level-3-1',
                      title: 'Menu Level 3.1',
                      type: 'item',
                      url: '#',
                    },
                    {
                      id: 'menu-level-3-2',
                      title: 'Menu Level 3.2',
                      type: 'item',
                      url: '#',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          icon: 'feather icon-power',
          url: '#',
          classes: 'nav-item disabled',
        },
      ],
    },
  ],
};

export default menuItems;
