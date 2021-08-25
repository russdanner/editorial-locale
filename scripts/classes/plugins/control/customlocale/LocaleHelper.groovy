package plugins.control.customlocale

import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder

class LocaleHelper {

    static final String DEFAULT_SOURCE_ID_FIELD_NAME = "localeSourceId_s"
    static final String DEFAULT_CODE_FIELD_NAME = "localeCode_s"

    def elasticsearch
    def sourceIdFieldName
    def codeFieldName

    LocaleHelper(elasticsearch, sourceIdFieldName, codeFieldName) {
        this.elasticsearch = elasticsearch
        this.sourceIdFieldName = sourceIdFieldName
        this.codeFieldName = codeFieldName
    }

    LocaleHelper(elasticsearch) {
      this.elasticsearch = elasticsearch
      this.sourceIdFieldName = DEFAULT_SOURCE_ID_FIELD_NAME
      this.codeFieldName = DEFAULT_CODE_FIELD_NAME
    }

    def searchSourceId(sourceId) {
        def result = [:]

        if (!sourceId) {
            return result
        }

        def queryStatement = sourceIdFieldName + ":" + sourceId

        def builder = new SearchSourceBuilder()
            .query(QueryBuilders.queryStringQuery(queryStatement))
        def executedQuery = elasticsearch.search(new SearchRequest().source(builder))
        def elasticResults = executedQuery.hits.hits*.getSourceAsMap()

        elasticResults.eachWithIndex { document, idx ->
            result[document[codeFieldName]] = document.localId
        }
        return result
    }

}