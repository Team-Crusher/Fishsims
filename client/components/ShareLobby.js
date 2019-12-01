import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  // spacer
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon
} from 'react-share'

import {CSSTransition} from 'react-transition-group'

class ShareLobby extends React.Component {
  constructor() {
    super()
    this.state = {
      display: false
    }
    this.toggleDisplay = this.toggleDisplay.bind(this)
    this.copy = this.copy.bind(this)
  }

  toggleDisplay(e) {
    e.preventDefault()
    this.setState(state => ({...state, display: !state.display}))
  }

  copy(e) {
    e.preventDefault()
    const copyText = document.getElementById('copy-value')
    copyText.select()
    copyText.setSelectionRange(0, 99999) /*For mobile devices*/
    document.execCommand('copy')

    const button = document.getElementById('copy-button')
    button.style.color = 'green'
    setTimeout(() => {
      button.style.color = 'black'
    }, 1000)

    if (this.state.display) {
      this.toggleDisplay()
    }
  }

  render() {
    const title = 'play fish with friends'
    const url = 'http://localhost:8080/' + this.props.lobbyId
    // const url = 'https://en.wikipedia.org/wiki/Wikipedia:Example'
    return (
      <div className="bottom-right-icons">
        <CSSTransition
          in={this.state.display}
          timeout={350}
          classNames="networks"
          unmountOnExit
        >
          <div className="networks">
            <div className="network">
              <FacebookShareButton
                url={url}
                quote={title}
                className="network_button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className="network">
              <TwitterShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className="network">
              <TelegramShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className="network">
              <WhatsappShareButton
                url={url}
                title={title}
                separator=":: "
                className="network_button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className="network">
              <LinkedinShareButton
                url={url}
                windowWidth={750}
                windowHeight={600}
                className="network_button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className="network">
              <PinterestShareButton
                url={String(window.location)}
                media={`${String(window.location)}/${'fish.png'}`}
                windowWidth={1000}
                windowHeight={730}
                className="network_button"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="network">
              <VKShareButton
                url={url}
                image={`${String(window.location)}/${'fish.png'}`}
                windowWidth={660}
                windowHeight={460}
                className="network_button"
              >
                <VKIcon size={32} round />
              </VKShareButton>
            </div>

            <div className="network">
              <OKShareButton
                url={url}
                image={`${String(window.location)}/${'fish.png'}`}
                className="network_button"
              >
                <OKIcon size={32} round />
              </OKShareButton>
            </div>

            <div className="network">
              <RedditShareButton
                url={url}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="network_button"
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>

            <div className="network">
              <TumblrShareButton
                url={url}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="network_button"
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>
            </div>

            <div className="network">
              <LivejournalShareButton
                url={url}
                title={title}
                description={url}
                className="network_button"
              >
                <LivejournalIcon size={32} round />
              </LivejournalShareButton>
            </div>

            <div className="network">
              <MailruShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <MailruIcon size={32} round />
              </MailruShareButton>
            </div>

            <div className="network">
              <EmailShareButton
                url={url}
                subject={title}
                body="body"
                className="network_button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>

            <div className="network">
              <ViberShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>

            <div className="network">
              <WorkplaceShareButton
                url={url}
                quote={title}
                className="network_button"
              >
                <WorkplaceIcon size={32} round />
              </WorkplaceShareButton>
            </div>

            <div className="network">
              <LineShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <LineIcon size={32} round />
              </LineShareButton>
            </div>

            <div className="network">
              <WeiboShareButton
                url={url}
                title={title}
                image={`${String(window.location)}/${'fish.png'}`}
                className="network_button"
              >
                <img
                  className="network-icon"
                  src="http://icons.iconarchive.com/icons/martz90/circle-addon2/512/weibo-icon.png"
                  alt="Weibo share button"
                />
              </WeiboShareButton>
            </div>

            <div className="network">
              <PocketShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <PocketIcon size={32} round />
              </PocketShareButton>
            </div>

            <div className="network">
              <InstapaperShareButton
                url={url}
                title={title}
                className="network_button"
              >
                <InstapaperIcon size={32} round />
              </InstapaperShareButton>
            </div>
          </div>
        </CSSTransition>
        <input
          readOnly
          id="copy-value"
          value={'http://localhost:8080/' + this.props.lobbyId}
        />
        <a href="#" onClick={this.copy} id="copy-button">
          <i className="fas fa-copy" />
        </a>
        <a href="#" onClick={this.toggleDisplay}>
          {this.state.display ? (
            <i className="fas fa-minus-circle" />
          ) : (
            <i className="fas fa-share-square" />
          )}
        </a>
      </div>
    )
  }
}

export default ShareLobby
