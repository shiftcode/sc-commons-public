export interface AirtableSyncConfig {
  airtableSync: {
    /** airtable api key */
    apiKey: string

    /** bucket to store attachments in */
    atBucketName: string

    /**
     *  sns topic to publish for an attachment to download
     *  part after region, will be joined to `arn:aws:sns:$[sc:region]:`
     */
    downloadTopic: string

    /**
     * comma separated string of language keys in KeyValue model in airtable
     * e.g. 'de, en, fr'
     */
    supportedLanguages: string

    /**
     * AWS region of the sns topic used to publish attachment download messages
     */
    snsTopicRegion: string
  }
}
