export enum TemplateEnum {
  WELCOME_EMAIL = 'welcome-email',
}

export type WelcomeEmailTemplate = {
  client_host: string;
  first_name: string;
  last_name: string;
};
