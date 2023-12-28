import { AppInstallationParameters, SelectedEvents } from '@customTypes/configPage';
import { AppEventKey } from './configCopy';

const initialParameters: AppInstallationParameters = {
  tenantId: '',
  notifications: [],
};

const getDefaultSelectedEvents = (): SelectedEvents => {
  return Object.values(AppEventKey).reduce(
    (selectedEvents, event) => ({ ...selectedEvents, [event]: false }),
    {} as SelectedEvents
  );
};

const defaultNotification = {
  channel: {
    id: '',
    name: '',
    teamId: '',
    teamName: '',
    tenantId: '',
  },
  contentTypeId: '',
  isEnabled: true,
  selectedEvents: getDefaultSelectedEvents(),
};

export { initialParameters, defaultNotification };
