const resultElementFlag1 = document.getElementById('result-flag-1')
const resultElementFlag2 = document.getElementById('result-flag-2')
const iceCreamSelectorElement = document.getElementById('select-ice-cream')
const savePreferenceElement = document.getElementById('save-preference-btn')
const loadingRingElement = document.getElementById('loading-ring')
let loadingRingOn = false

posthog.init(
    'sTMFPsFhdP1Ssg', 
    { 
        api_host: 'https://app.posthog.com', 
        loaded: () => { updateFeatureFlagsDisplay(0) 
    } 
})

const updateFeatureFlagsDisplay = (timeout) => {
    setTimeout(() => {
        const isFeature1Enabled = posthog.isFeatureEnabled('demo-flag-1')
        const isFeature2Enabled = posthog.isFeatureEnabled('demo-flag-2')

        resultElementFlag1.innerHTML = isFeature1Enabled ? 'On' : 'Off'
        resultElementFlag2.innerHTML = isFeature2Enabled ? 'On' : 'Off'
    
        resultElementFlag1['style']['color'] = isFeature1Enabled ? 'green' : 'red'
        resultElementFlag2['style']['color'] = isFeature2Enabled ? 'green' : 'red'
        savePreferenceElement['className'] = 'btn btn-md ' + (isFeature2Enabled ? 'btn-success' : 'btn-primary')
        console.log('[POSTHOG] Updated display')
    }, timeout)
}

const toggleLoadingRing = () => {
    if (loadingRingOn) loadingRingElement['style']['display'] = 'none'
    else loadingRingElement['style']['display'] = 'inline-block'
    loadingRingOn = !loadingRingOn
}

const handlePreferenceChange = () => {
    toggleLoadingRing()
    posthog.people.set({ 'favorite_icecream': iceCreamSelectorElement.value })
    console.log('[POSTHOG] Set user property')
    posthog.people._flush()
    console.log('[POSTHOG] Flushing...')
    setTimeout(() => {
        console.log('[POSTHOG] Reloading feature flags')
        posthog.reloadFeatureFlags()
    }, 2000)
    setTimeout(() => {
        toggleLoadingRing()
    }, 3000)
}

// Listeners

savePreferenceElement.addEventListener('click', handlePreferenceChange)

posthog.onFeatureFlags(() => {
    console.log('[POSTHOG] Feature flags reloaded successfully')
    console.log('[POSTHOG] Updating display...')
    updateFeatureFlagsDisplay(500)
})

