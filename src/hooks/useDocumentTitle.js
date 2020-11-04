import React from 'react';

//should take two arguments: title and fallbackTitle. Whenever title changes it should be set as the document title
const useDocumentTitle = (title, fallBackTitle) => {
    React.useEffect(() => {
        document.title = title;
        return () => {
            document.title = fallBackTitle;
        };
    })
}

export default useDocumentTitle;