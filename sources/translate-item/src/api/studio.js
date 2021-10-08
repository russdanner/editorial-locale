import 'core-js/stable';
import 'regenerator-runtime/runtime';

import CookieHelper from '../helpers/cookie';

const API_GET_ITEM_TREE = '/studio/api/1/services/api/1/content/get-items-tree.json';
const API_GET_ITEM = '/studio/api/1/services/api/1/content/get-item.json';
const API_CLIPBOARD_COPY = '/studio/api/1/services/api/1/clipboard/copy-item.json';
const API_CLIPBOARD_PASTE = '/studio/api/1/services/api/1/clipboard/paste-item.json';

const StudioAPI = {
  origin() {
    return window.location.origin;
  },
  xsrfToken() {
    return CookieHelper.get('XSRF-TOKEN');
  },
  siteId() {
    const url = new URL(window.location.href);
    if (url.searchParams.has('site')) {
      return url.searchParams.get('site');
    }

    return CookieHelper.get('crafterSite');
  },
  getSelectedItems: function() {
    return CStudioAuthoring.SelectedContent.getSelectedContent().map(item => ({
      name: item.internalName,
      path: item.uri,
    }));
  },
  async getChildrenPaths(path) {
    const res = await fetch(`${StudioAPI.origin()}${API_GET_ITEM_TREE}?site=${StudioAPI.siteId()}&path=${path}&depth=1`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data.item.children.filter(child => child.path !== path).map(child => {
        return child.path;
      });
    }

    return [];
  },
  async getItem(path) {
    const res = await fetch(`${StudioAPI.origin()}${API_GET_ITEM}?site=${StudioAPI.siteId()}&path=${path}&populateDependencies=false`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }

    return null;
  },
  async clipboardCopy(path) {
    const item = {
      item: [{ uri: path }]
    };
    const res = await fetch(`${StudioAPI.origin()}${API_CLIPBOARD_COPY}?site=${StudioAPI.siteId()}`, {
      method: 'POST',
      headers: {
        'x-xsrf-token': StudioAPI.xsrfToken(),
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(item),
    });

    if (res.status === 200) {
      return true;
    }

    return false;
  },
  async clipboardPaste(parentPath) {
    const res = await fetch(`${StudioAPI.origin()}${API_CLIPBOARD_PASTE}?site=${StudioAPI.siteId()}&parentPath=${parentPath}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      return true;
    }

    return false;
  },
};

export default StudioAPI;
