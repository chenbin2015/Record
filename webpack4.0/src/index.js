
import styles from './index.scss'
function component() {
    const element = document.createElement('div');
    element.setAttribute('class', styles.test)
    const child = document.createElement('div')
    child.innerHTML = "i'm a child"
    child.setAttribute('class', styles.d1)
    element.appendChild(child)


    return element;
}

document.body.appendChild(component());