// @flow

export type UILocalizedData = {
    // TON
    TONLabel: string,
    CopyRight: string,
    Disclaimer: string,

    // Terms
    TermsCookiesPolicy: string,
    Here: string,
    LegalNotes: string,

    // Login
    Login: string,
    WeNeedYourPhoneNumber: string,
    PhoneNumber: string,
    BankCardNumber: string,
    TermsButtonText: string,
    GetCode: string,
    WeHaveSentYouACode: string,
    Code: string,
    HaveNotReceivedTheCode: string,
    CheckingTheCode: string,
    InvalidPhoneNumber: string,
    InvalidContractAddress: string,
    SmartContractAddress: string,
    InvalidCode: string,
    InvalidFirstName: string,
    InvalidLastName: string,
    InvalidUsername: string,
    InvalidPassword: string,
    InvalidEmail: string,
    InvalidPhone: string,
    InvalidDate: string,
    InvalidBankCardNumber: string,
    YouHaveEnteredAnInvalidPhoneNumber: string,
    YouHaveEnteredAnEmptyCodeFor: string,
    YouHaveEnteredAnExpiredCodeFor: string,
    YouHaveEnteredAnInvalidCodeFor: string,
    YouHaveEnteredAnInvalidFirstNameFor: string,
    YouHaveEnteredAnInvalidLastNameFor: string,
    YouHaveEnteredAnUnacceptableUsername: string,
    YouHaveEnteredAUsernameWhichIsAlreadyTaken: string,
    YouHaveEnteredAUsernameWhichIsNotDifferent: string,
    LimitExceededFor: string,
    PleaseTryLater: string,
    PleaseTryAgain: string,
    YouCanRequestTheCodeAgain: string,
    WhatIsYourName: string,
    CreateAUsername: string,
    AddAProfilePicture: string,
    StartMessaging: string,
    // Login (Telegram translations)
    Login_PhoneFloodError: string,
    Login_PhoneBannedError: string,

    // System
    Warning: string,
    Error: string,
    Success: string,
    Cancel: string,
    Done: string,
    Continue: string,
    Close: string,
    Add: string,
    Edit: string,
    Delete: string,
    Manage: string,
    OK: string,
    Create: string,
    Search: string,
    Import: string,
    NotFound: string,
    Yes: string,
    No: string,
    Copy: string,
    CopyToClipboard: string,
    Select: string,
    SelectAll: string,
    DeselectAll: string,
    TakePhoto: string,
    TakeVideo: string,
    ChooseFromLibrary: string,
    NotDefined: string,
    NotChosen: string,
    Next: string,
    Prev: string,
    Upload: string,
    Submit: string,
    Download: string,
    Update: string,
    Value: string,
    Hide: string,
    Skip: string,
    In: string,
    Sec: string,
    Description: string,
    Share: string,
    ShareToTalk: string,
    ShareLink: string,
    Report: string,
    PleaseDoNotCloseTheApp: string,
    ThisActionCannotBeUndone: string,
    SomethingWentWrong: string,
    NewVersionIsAvailable: string,
    PleaseUpdate: string,
    ForgotPassword: string,
    LoadMore: string,
    YouMustUseThePhoneNumberSpecifiedInTheOffer: string,
    ConnectionStatus: string,
    ConnectionHasBeenLost: string,
    SorryWeCannotDoActionAtTheMoment: string,
    NumberCopiedToClipboard: string,
    LinkCopiedToClipboard: string,
    MessageCopiedToClipboard: string,
    HashCopiedToClipboard: string,
    FileIsTooBig: string,
    Important: string,
    UserIsNotAuthorized: string,
    WalletIsNotInitialized: string,
    WeAreSorryButYourBrowserVersionIsNotCompatible: string,
    PleaseGoOnline: string,

    // Profile
    Profile: string,
    EditProfile: string,
    LogOut: string,
    Name: string,
    Details: string,
    GivenNames: string,
    Surname: string,
    Username: string,
    UploadAvatar: string,
    DoYouWantToLogOut: string,
    EthereumWalletBalance: string,
    Addresses: string,
    BackupAccount: string,

    EnterYouNameAndProfilePicture: string,
    AnyDetailsSuchAsAge: string,
    YourUsername: string,
    UpdateUsername: string,
    EditUsernameInstructions: string,
    ThisLinkOpensChat: string,

    TelegramCall: string,
    PhoneCall: string,
    WeWillSendAnSMSWithConfirmationCode: string,

    ChangeNumber: string,
    CopyNumber: string,
    EnterYourNewPhoneNumber: string,
    EditPhoneNumberInstructions: string,

    FromCamera: string,
    FromGallery: string,
    DeletePhoto: string,

    Bio: string,
    SendMessage: string,
    BlockUser: string,

    NumberOccupied: string,
    NumberIsAlreadyConnectedToATelegramAccount: string,

    // Contacts
    Info: string,
    SearchContacts: string,
    SearchFriends: string,
    InviteFriends: string,
    Contacts: string,
    Friends: string,
    NewContact: string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    AddContact: string,

    Online: string,
    Recently: string,
    LastWeek: string,
    LastMonth: string,
    ForALongTime: string,
    Was: string,

    FailedToAddNewContact: string,
    ContactsPermissionHasNotBeenGranted: string,
    AddingContactIsNotATelegramUser: string,
    RequestingContactsPermission: string,
    WeUseContactsToAllowYouToInviteFriends: string,
    ContactsAccessDenied: string,
    ContactsGrantAccess: string,
    OpenSettings: string,
    Recent: string,

    // Messenger
    Today: string,
    Yesterday: string,
    NewMessage: string,
    NewGroup: string,
    CreateChannel: string,
    DiscoverBots: string,
    Members: string,
    WhomWouldYouLikeToMessage: string,
    AddMembers: string,
    AddSubscribers: string,
    AddAdministrator: string,
    GroupName: string,
    Group: string,
    You: string,
    Member01: string,
    Member11: string,
    Member24: string,
    Member50: string,
    NewRecord: string,
    NewChannel: string,
    ChannelName: string,
    YouCanProvideAnOptionalDescriptionForYourChannel: string,
    Channel: string,
    Public: string,
    Private: string,
    PrivateChannelsCanOnlyBeJoinedViaAnInviteLink: string,
    PeopleCanJoinYourChannelByFollowingThisLink: string,
    PublicChannelsCanBeFoundInSearchAnyoneCanJoinThem: string,
    PeopleCanShareThisLinkWithOtherAndFindYourChannel: string,
    WhomWouldYouLikeToAdd: string,
    UnreadMessages: string,
    SayHello: string,

    // WalletExporter
    BackupWalletSuggestion: string,
    BackupWalletTitle: string,
    BackupWalletDescription: string,
    Word: string,
    OutOf: string,
    BackupNow: string,
    Later: string,

    // WalletSetup
    WalletSetup: {
        LogoText: string,
        CreateANew: string,
        Restore: string,
        PrivateKey: string,
        PrivateKeyDetails: string,
        PrivateKeyHint: string,
        KeyPhrase: string,
        KeyPhrasePlaceholder: string,
        KeyPhraseDetails: string,
        KeyPhraseWarning: string,
        KeyPhraseHint: string,
        PhraseCheck: string,
        PhraseCheckDetails: string,
        PhraseCheckHint: string,
        PhraseCheckSuccess: string,
        PhraseCheckAgreement: string,
        RestoreWallet: string,
        RestoreWalletDetails: string,
        EncodePhrase: string,
        IHaveWrittenAndRemembered: string,
        OKContinue: string,
        Seconds: string,
        SetLocalPassword: string,
        SetLocalPasswordDetails: string,
        SetLocalPasswordPlaceholder: string,
        SetLocalPasswordHint: string,
        SetLocalPasswordWarning: string,
        SetLocalPasswordContinue: string,
        ConfirmLocalPassword: string,
        ConfirmLocalPasswordDetails: string,
        ConfirmLocalPasswordPlaceholder: string,
        ConfirmLocalPasswordHint: string,
        ConfirmLocalPasswordSuccess: string,
        ConfirmLocalPasswordWarning: string,
        ConfirmLocalPasswordContinue: string,
    },

    // WalletImporter
    AddWallet: string,
    SeedPhrase: string,
    ContinueWithPassword: string,
    CreateNewAccount: string,
    RestoreFrom12Words: string,

    // WalletTransferer
    ScanQRCodeWithTONChatApplicationToContinue: string,
    WalletQRCodeScannerHint: string,

    // Chat list
    YouHaveNoConversationsYet: string,

    // Chat
    ChatWith: string,
    DoYouWantToBlockThisUser: string,
    TypeMessage: string,
    FailedToLoadDocument: string,

    // Wallet
    WeNeedYourPassword: string,
    WeNeedYourPasswordToUpgradeWallet: string,
    Password: string,
    ConfirmPassword: string,
    WrongPassword: string,
    UpgradingWallet: string,
    ExportingBackupPhrase: string,
    DecryptingDocument: string,
    RecoveringDocument: string,
    SorryYouDoNotHaveAnAccessToThisDocument: string,

    // Username
    Username_InvalidTooShort: string,
    Username_InvalidStartsWithNumber: string,
    Username_InvalidCharacters: string,
    Username_InvalidTaken: string,
    Username_CheckingUsername: string,
    Username_UsernameIsAvailable: string,

    // 2FA
    TwoStepAuth_EnterPasswordHelp: string,
    TwoStepAuth_EnterPasswordInvalid: string,
    TwoStepAuth_RecoveryUnavailable: string,
    TwoStepAuth_RecoveryFailed: string,
    TwoStepAuth_RecoveryCodeHelp: string,
    TwoStepAuth_RecoveryEmailUnavailable: string,
    TwoStepAuth_RecoveryCodeExpired: string,
    TwoStepAuth_InvalidPasswordError: string,
    TwoStepAuth_FloodError: string,

    // Messenger
    Messenger: string,
    SearchForMessagesOrUsers: string,
    PleaseSelectAChatToStartMessaging: string,

    // Groups && Channels
    DoYouWantToLeaveChannel: string,
    DoYouWantToLeaveGroup: string,
    DoYouWantToClearHistory: string,
    DoYouWantToDeleteChannel: string,
    DoYouWantToDeleteGroup: string,
    LeaveChannel: string,
    LeaveGroup: string,
    DeleteChannel: string,
    DeleteGroup: string,
    ClearHistory: string,
    Admins: string,
    ChannelInfo: string,
    Administrators: string,
    Administrator: string,
    Subscribers: string,
    Blacklist: string,
    FailedToLeaveChannel: string,
    FailedToLeaveGroup: string,
    RevokeLink: string,
    ConvertToSupergroup: string,
    ConvertToSupergroupDetails: string,
    AllMembersAreAdmins: string,
    OnlyAdminsCanAddAndRemoveMembers: string,
    AllMembersCanAddAndRemoveMembers: string,
    YouCanAddAdministratorsToHelpYouManageYourChannel: string,
    Creator: string,
    AddedBy: string,
    GroupPhotoUpdated: string,

    // Wallet
    Wallet: string,
    PublicAddress: string,
    SearchForTransactions: string,
    YouHaveNoTransactionsYet: string,
    Recipient: string,
    Recipients: string,
    SearchForRecipients: string,
    TotalBalance: string,
    Transaction: string,
    Sender: string,
    FailedToCreateWallet: string,
    FailedToCreateNewAccount: string,
    FailedToSendTransaction: string,
    FailedToSetLimit: string,
    BackupWallet: string,
    Amount: string,
    Date: string,
    Balance: string,
    Gram: string,
    gram: string,
    Send: string,
    UserHasNoWallet: string,
    TransactionFrom: string,
    InvitesYouToWallet: string,
    Transactions: string,

    // Accounts
    Account: string,
    Accounts: string,
    MyMainAccount: string,
    MyAccount: string,
    Limits: string,
    SingleOperationLimit: string,
    PublicAccount: string,
    AccountTypeHint: string,
    PublicAccountWarning: string,
    MakePublic: string,
    NoThankYou: string,
    AddNewLimit: string,
    NewLimit: string,
    EditLimit: string,
    NewAccount: string,
    Period: string,
    UplimitRule: string,
    DoYouWantToDeleteLimit: string,
    AccountLimitPeriod: {
        daily: string,
        weekly: string,
        monthly: string,
        total: string,
    },
    AccountLimitRule: {
        passportVerification: string,
        twoFactorAuthentication: string,
    },
    AccountAddress: string,
    AddressURLHint: string,
    AddressShare: string,
    Request: string,

    // Passport
    ViewPassport: string,
    PassportNeedsAttention: string[],
    AtTime: string,
    Passport: string,
    Status: string,
    ReviewAndConfirm: string,
    PassportRequestReview: string,
    PassportFetchingStatus: string,
    PassportStatus: string[],
    PassportSaveSuccess: string,
    PassportSaveError: string,
    DeleteDocument: string,
    DeleteDocumentMessage: string,
    DocumentDeleteDataAndFiles: string,
    Information: string,
    Confirmed: string,
    Unconfirmed: string,
    PersonalDetails: string,
    IdentityDocument: string,
    FillInInformation: string,
    FillInPersonalDetails: string,
    UploadAScan: string,
    DoB: string,
    DoBMin: string,
    DoBMax: string,
    Gender: string,
    Citizenship: string,
    Residence: string,
    SelectResidence: string,
    SelectCountry: string,
    Country: string,
    Address: string,
    City: string,
    State: string,
    PostalCode: string,
    Male: string,
    Female: string,
    RequestedFiles: string,
    IdentificationDocument: string,
    IdentityCard: string,
    DriversLicense: string,
    InternalPassport: string,
    ResidencePermit: string,
    AddPassport: string,
    AddIdentityCard: string,
    AddDriversLicense: string,
    AddInternalPassport: string,
    AddResidencePermit: string,
    EditPassport: string,
    EditIdentityCard: string,
    EditDriversLicense: string,
    EditInternalPassport: string,
    EditResidencePermit: string,
    DocumentNumber: string,
    DocumentExpiration: string,
    DocumentFront: string,
    DocumentReverse: string,
    DocumentSelfie: string,
    DocumentFrontDescription: string,
    DocumentReverseDescription: string,
    DocumentSelfieDescription: string,
    SelfieWithPassportOrID: string,
    DocumentRequirements: string,

    PublicAddressCopiedToClipboard: string,
    Tokens: string,
    Currencies: string,
    Events: string,
    Pay: string,

    // Tokens
    TON: string,
    Ethereum: string,
    Binance: string,

    // Transactions
    Exchange: string,
    ChooseDepositToken: string,
    ExchangeFrom: string,
    ExchangeTo: string,
    WriteOffAccount: string,
    SearchByToken: string,
    SearchByAccount: string,
    Deposit: string,
    max: string,
    Receive: string,
    ConfirmAndTransfer: string,
    YourTransactionCouldNotBeCompleted: string,
    YourTransactionCompleted: string,
    ViewOnEtherscan: string,
    TransactionStatus: {
        rejected: string,
        aborted: string,
        sending: string,
    },
    message: {
        sending: string
    },
    fee: string,
    feeAmount: string,

    ConfirmIdentity: string,
    SMSNotice: string,

    // Limits
    TransactionError: string[],
    LimitSetSuccess: string,
    LimitRemoveSuccess: string,

    // Gram.Scan
    Gram01: string, // 01 gram
    Gram11: string, // 21 grams
    Gram24: string, // 22,23,24 grams
    Gram50: string, // 25,26,27,28,29,30 grams

    // Dates
    DateSymbols: {
        year: string,
        month: string,
        day: string,
    },

    // Stub page
    GetNotifiedWhenWeLaunch: string,
    WillGetInTouchWithYouSoon: string,
    ThanksForCooperation: string,
    Contact: string,
    PressEmail: string,

    // Toasts
    EnterCorrectDataToField: string,
    EmailAddress: string,

    // Feedback module
    ThanksForYourFeedback: string,
    DescribeYourIssueOrIdea: string,
    YourEmail: string,
    SendFeedback: string,
    PushFeedbackShort: string,
    PushFeedbackLong: string,

    // Cross-services
    WeCanTFindThePageYouReLookingFor: string,
    TheRequestedServiceIsDownToGetUpAsapTryAgainLater: string,
    WelcomeTo000: string,
    BackToHome: string,
    serviceUnavailable: string,

    // Common
    // Time
    hours: string,
    minutes: string,
    hours01: string,
    hours11: string,
    hours24: string,
    hours50: string,
    minutes01: string,
    minutes11: string,
    minutes24: string,
    minutes50: string,
}
