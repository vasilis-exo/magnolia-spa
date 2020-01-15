session = ctx.getJCRSession("config")

newFilter = session.getNode("/server/filters").addNode("cors", "mgnl:content")
newFilter.setProperty("enabled", "true")
newFilter.setProperty("class", "info.magnolia.cms.filters.AddHeadersFilter")

session.getNode("/server/filters").orderBefore("cors", "range")

filterConfig = newFilter.addNode("headers", "mgnl:contentNode")
filterConfig.setProperty("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept")
filterConfig.setProperty("Access-Control-Allow-Methods", "GET")
filterConfig.setProperty("Access-Control-Allow-Origin", "*")

println("Added CORS Filter")
session.save()
