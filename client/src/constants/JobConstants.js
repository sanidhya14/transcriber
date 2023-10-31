export const TRANSCRIPTION_JOB_STATUS = {
  /**
   * This denotes the state while job is yet not requested.
   */
  INACTIVE: "INACTIVE",

  /**
   * This denotes the state while job is requested (i.e. user submits the input).
   * Any kind of prechecks, backend config fetching and input validation will happen here.
   */
  REQUESTED: "REQUESTED",

  /**
   * This denotes the state while job is running.
   * In this state the bakend will actually run the transcription.
   */
  STARTED: "STARTED",

  /**
   * This denotes the successfull job completion.
   */
  COMPLETED: "COMPLETED",

  /**
   * This denotes the job landing into an errored state.
   */
  FAILED: "FAILED",
};

export const INPUT_LANGUAGE = {
  AUTO_DETECT: "Auto-Detect",
  AFRIKAANS: "Afrikaans",
  ARABIC: "Arabic",
  ARMENIAN: "Armenian",
  AZERBAIJANI: "Azerbaijani",
  BELARUSIAN: "Belarusian",
  BOSNIAN: "Bosnian",
  BULGARIAN: "Bulgarian",
  CATALAN: "Catalan",
  CHINESE: "Chinese",
  CROATIAN: "Croatian",
  CZECH: "Czech",
  DANISH: "Danish",
  DUTCH: "Dutch",
  ENGLISH: "English",
  ESTONIAN: "Estonian",
  FINNISH: "Finnish",
  FRENCH: "French",
  GALICIAN: "Galician",
  GERMAN: "German",
  GREEK: "Greek",
  HEBREW: "Hebrew",
  HINDI: "Hindi",
  HUNGARIAN: "Hungarian",
  ICELANDIC: "Icelandic",
  INDONESIAN: "Indonesian",
  ITALIAN: "Italian",
  JAPANESE: "Japanese",
  KANNADA: "Kannada",
  KAZAKH: "Kazakh",
  KOREAN: "Korean",
  LATVIAN: "Latvian",
  LITHUANIAN: "Lithuanian",
  MACEDONIAN: "Macedonian",
  MALAY: "Malay",
  MARATHI: "Marathi",
  MAORI: "Maori",
  NEPALI: "Nepali",
  NORWEGIAN: "Norwegian",
  PERSIAN: "Persian",
  POLISH: "Polish",
  PORTUGUESE: "Portuguese",
  ROMANIAN: "Romanian",
  RUSSIAN: "Russian",
  SERBIAN: "Serbian",
  SLOVAK: "Slovak",
  SLOVENIAN: "Slovenian",
  SPANISH: "Spanish",
  SWAHILI: "Swahili",
  SWEDISH: "Swedish",
  TAGALOG: "Tagalog",
  TAMIL: "Tamil",
  THAI: "Thai",
  TURKISH: "Turkish",
  UKRAINIAN: "Ukrainian",
  URDU: "Urdu",
  VIETNAMESE: "Vietnamese",
  WELSH: "Welsh"
};

export const TRANSCRIPTION_MODES = {
  FAST: "Fast",
  BALANCED: "Balanced",
  HIGH_ACCURACY: "High Accuracy",
};

export const EXPORT_FORMATS = {
  TXT: "txt",
  SRT: "srt",
  JSON: "json",
  VTT: "vtt",
};
