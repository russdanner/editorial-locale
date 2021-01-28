/* Common API
        if (path.indexOf('{locale}') != -1) {
          var parentPath = CStudioAuthoring.Utils.getQueryParameterByName('path').replace("/site/website/","");
          var locale = parentPath.substring(0, parentPath.indexOf("/"));

          path = path.replace('{locale}',locale)
        }
*/