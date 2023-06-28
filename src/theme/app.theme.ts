import type { ThemeConfig } from 'antd';
import { theme } from 'antd';
import { createRoot } from 'react-dom/client';

const { getDesignToken, useToken } = theme;

const appTheme: ThemeConfig = {
  token: {
    colorPrimary: '#E13535',
    colorInfo:'#3A2B86'
  },
};

export default appTheme;