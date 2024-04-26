import { BaseModel, LocationBaseModel } from '@app/types';

interface StoreConfig extends BaseModel {
  feeShip?: number;
  transferContent?: string;
  reasonOrderCancel?: string[];
  hotlineSupport?: {
    order?: string;
    customerCareHotline?: string;
  };
}

interface FrequentlyAskedQuestions extends BaseModel {
  question?: string;
  answer?: string;
}

interface TermAndPolicy extends BaseModel {
  deliveryPolicy?: string;
  privatePolicy?: string;
  termAndCondition?: string;
}

interface StoreInformation extends LocationBaseModel, BaseModel {
  brandStore?: string; // Câu chuyện thương hiệu
  logo?: string; // logo cửa hàng
  name?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  taxCode?: string;
}

interface BankAccountConfig extends BaseModel {
  bankCode?: string;
  bankNumber?: string;
  bankName?: string;
  bankBranch?: string;
}

interface EmailConfig extends BaseModel {
  username?: string;
  password?: string;
  mailServer: string; // SMTP
  port: number; // 587
}

interface Stores extends BaseModel {
  storeConfig?: StoreConfig;
  storeInformation?: StoreInformation;
  faqs?: FrequentlyAskedQuestions;
  termAndPolicy?: TermAndPolicy;
  emailConfig?: EmailConfig;
  bankAccountConfig?: BankAccountConfig;
}

export { FrequentlyAskedQuestions, StoreConfig, StoreInformation, Stores, TermAndPolicy };
