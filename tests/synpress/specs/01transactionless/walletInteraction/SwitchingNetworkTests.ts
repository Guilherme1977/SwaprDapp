import { MenuBar } from '../../../../pages/MenuBar'
import { SwapPage } from '../../../../pages/SwapPage'
import { NetworkSwitcher } from '../../../../pages/NetworkSwitcher'
import { ChainsEnum } from '../../../../utils/enums/ChainsEnum'
import { MetamaskNetworkHandler } from '../../../../utils/MetamaskNetworkHandler'

describe('Switching from mainnet tests', () => {
  before(() => {
    cy.clearLocalStorage()
    MetamaskNetworkHandler.addARinkeby()
    MetamaskNetworkHandler.addGnosis()
    MetamaskNetworkHandler.switchToNetworkIfNotConnected()
  })
  beforeEach(() => {
    SwapPage.visitSwapPage()
    MenuBar.connectWallet()
    cy.wait(5000)
    MetamaskNetworkHandler.switchToNetworkIfNotConnected()
  })
  afterEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps()
  })
  after(() => {
    cy.resetMetamaskAccount()
    cy.wait(500)
  })

  it('Should display that Ropsten network isnt supported [TC-56]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('ropsten')
    MenuBar.getUnsupportedNetworkWarning().should('be.visible')
    MenuBar.getUnsupportedNetworkPopover().should('be.visible')
  })
  it('Should switch from unsupported network to mainnet wallet [TC-57]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('ropsten')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.MAINNET)
  })
  it('Should switch from mainnet to gnosis by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.GNOSIS)
  })
  it('Should switch from mainnet to arbitrum by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.wait(4000)
    cy.allowMetamaskToAddAndSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.ARBITRUM)
  })
  it('Should switch from mainnet to Polygon by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToAddAndSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.POLYGON)
  })
  it('Should switch from gnosis to mainnet by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.MAINNET)
  })
  it('Should switch from gnosis to arbitrum by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.ARBITRUM)
  })
  it('Should switch from gnosis to polygon by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.POLYGON)
  })
  it('Should switch from rinkeby to mainnet by dapp [TC-55]', () => {
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.MAINNET)
  })
  it('Should switch from rinkeby to arbitrum by dapp [TC-55]', () => {
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.ARBITRUM)
  })
  it('Should switch from rinkeby to gnosis by dapp [TC-55]', () => {
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.GNOSIS)
  })
  it('Should switch from rinkeby to polygon by dapp [TC-55]', () => {
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.POLYGON)
  })
  it('Should switch from a. rinkeby to mainnet by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Arbitrum Rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.MAINNET)
  })
  it('Should switch from a. rinkeby to arbitrum by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Arbitrum Rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.ARBITRUM)
  })
  it('Should switch from a. rinkeby to Polygon by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Arbitrum Rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.POLYGON)
  })
  it('Should switch from a. rinkeby to gnosis by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('Arbitrum Rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.GNOSIS)
  })
  it('Should switch from arbitrum one to polygon by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.POLYGON)
  })
  it('Should switch from arbitrum one to mainnet by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.MAINNET)
  })
  it('Should switch from arbitrum one to gnosis by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.GNOSIS)
  })
  it('Should switch from polygon to mainet by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.MAINNET)
  })
  it('Should switch from polygon to mainet by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.ARBITRUM)
  })
  it('Should switch from polygon to mainet by dapp [TC-55]', () => {
    MetamaskNetworkHandler.switchToNetworkIfNotConnected('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    NetworkSwitcher.checkNetwork(ChainsEnum.GNOSIS)
  })
})
