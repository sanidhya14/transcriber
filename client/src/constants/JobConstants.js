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
  ENGLISH: "English",
  SPANISH: "Spanish",
  FRENCH: "French",
  GERMAN: "German",
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
