import React from 'react'

//should take two arguments: key.code, the key to track, and callback, to run code to run when that key is pressed
const useKeydown = (key, callback) => {
    React.useEffect(() => {
        function handleKeydown(ev) {
            if (ev.code === key) {
                callback();
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })
}

export default useKeydown;