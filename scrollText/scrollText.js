var scrollText = function (options) {
    options = options || {}

    this.dom = document.querySelector(options.id)
    this.width = options.width || 200
    this.height = options.height || 30
    this.step = options.step || .1
    this.text = options.text || ''
    this.content = null
    this._initDom()
}
scrollText.prototype = {
    _initDom: function () {
        this.dom.removeAttribute('class')

        this._initStyle()
        this.dom.setAttribute('class', 'scrollTextWrap')
        var content = document.createElement('div')
        content.setAttribute('contenteditable', true)
        content.setAttribute('class', 'scrollTextBasic')
        content.innerHTML = this.text
        content.addEventListener('focus', this._handleFocus.bind(this))
        content.addEventListener('blur', this._handleBlur.bind(this))
        this.content = content
        this.dom.appendChild(content)
    },
    _initStyle: function () {
        this.baseCSS = ` .scrollTextWrap {
            display: block;
            width: ${this.width}px;
            height: ${this.height}px;
            overflow: hidden;
        }
        .scrollTextBasic {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            white-space: nowrap;
            border: 0px;
            outline: none;

        }`
        var css = document.querySelector('#tempCss')
        if (!css) {
            css = document.createElement('style')
            css.setAttribute('id', 'tempCss')
            document.head.append(css)
        }
        css.innerHTML = this.baseCSS

    },
    _handleFocus: function () {
        if (this.content.scrollWidth <= this.content.offsetWidth) {
            return
        }
        var distance = -(this.content.scrollWidth - 20)
        var duration = Math.abs((distance / this.step) / 1000)
        var css = document.querySelector('#tempCss')
        const customCSS = ` 
            .scrollTextFocus {
                animation: scrollTextFocusAni ${duration}s infinite linear ;
                outline: none;
                white-space: nowrap;
            }

            @keyframes scrollTextFocusAni {
                12% {
                    transform: translate(${distance * .2}px)
                }
                24% {
                    transform: translate(${distance * .4}px)
                }
                36% {
                    transform: translate(${distance * .6}px)
                }
                48% {
                    transform: translate(${distance * .8}px)
                }
                60% {
                    transform: translate(${distance}px)
                }
                80% {
                    transform: translate(${distance}px)
                }
                90% {
                    transform: translate(0px)
                }
            }`
        css.innerHTML = this.baseCSS + customCSS
        this.content.setAttribute('class', ' scrollTextFocus')
    },
    _handleBlur: function () {
        this.content.setAttribute('class', ' scrollTextBasic')
    }
}