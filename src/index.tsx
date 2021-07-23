import ReactDOM from 'react-dom';
import App from './App';
import { DevTools,loadServer } from 'jira-dev-tool'
import 'antd/dist/antd.less';
import { AppProviders } from 'context'


loadServer(() => {
  ReactDOM.render(
      <AppProviders>
        <DevTools/>
        <App />
      </AppProviders>
    ,document.getElementById('root')
  );
})
