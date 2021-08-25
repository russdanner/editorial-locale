import plugins.control.customlocale.LocaleHelper

def sourceId = params.sourceId

if (!sourceId) {
  return [:]
}

def helper = new LocaleHelper(elasticsearch)

return helper.searchSourceId(sourceId)
