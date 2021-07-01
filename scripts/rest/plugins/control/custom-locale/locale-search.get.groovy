// Import the required classes
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder

def uuid = params.uuid
def objectId = params.objectId

if (!uuid || !objectId) return 0

def queryStatement = '(localeSourceId_s:' + uuid + ') AND NOT (objectId:' + objectId + ')'

// Use the appropriate builders according to your query
def builder = new SearchSourceBuilder()
    .query(QueryBuilders.queryStringQuery(queryStatement))

// Execute the query
def executedQuery = elasticsearch.search(new SearchRequest().source(builder))

def itemsFound = executedQuery.hits.totalHits
def items = executedQuery.hits.hits

return items.length