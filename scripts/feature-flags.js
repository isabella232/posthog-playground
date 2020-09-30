
posthog.init('sTMFPsFhdP1Ssg', { api_host: 'https://app.posthog.com', loaded: () => { updateFeatureFlagsDisplay(0) } })


const resultElementFlag1 = document.getElementById('result-flag-1')
const resultElementFlag2 = document.getElementById('result-flag-2')
const iceCreamSelectorElement = document.getElementById('select-ice-cream')

const updateFeatureFlagsDisplay = (timeout) => {
    setTimeout(() => {
        resultElementFlag1.innerHTML = posthog.isFeatureEnabled('demo-flag-1') ? 'On' : 'Off'
        resultElementFlag2.innerHTML = posthog.isFeatureEnabled('demo-flag-2') ? 'On' : 'Off'
    
        resultElementFlag1['style']['color'] = resultElementFlag1.innerHTML === 'On' ? 'green' : 'red'
        resultElementFlag2['style']['color'] = resultElementFlag2.innerHTML === 'On' ? 'green' : 'red'
    }, timeout)


}

const loadingRingElement = document.getElementById('loading-ring')
let loadingRingOn = false

const toggleLoadingRing = () => {
    if (loadingRingOn) loadingRingElement['style']['display'] = 'none'
    else loadingRingElement['style']['display'] = 'inline-block'
    loadingRingOn = !loadingRingOn
}

document.getElementById('save-preference-btn').addEventListener('click', () => {
    toggleLoadingRing()
    posthog.people.set({ 'favorite_icecream': iceCreamSelectorElement.value })
    console.log("Flushing!")
    posthog.people._flush()
    setTimeout(() => {
        posthog.reloadFeatureFlags()
    }, 2000)
    setTimeout(() => {
        toggleLoadingRing()
    }, 3000)
})

posthog.onFeatureFlags(() => {
    console.log('update!')
    updateFeatureFlagsDisplay(500)
})
