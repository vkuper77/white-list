import contract from '@truffle/contract'

export async function loadContract (name, provider) {
    const response = await fetch(`/contracts/${name}.json`)
    const Artifact = await response.json()

    const _contract = contract(Artifact)
    _contract.setProvider(provider)

    let deployedContract = null

    try{
        deployedContract = await _contract.deployed()
    } catch {
        console.error('You are connected to the wrong network')
    }

    return deployedContract
}