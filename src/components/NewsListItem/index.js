import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, ListItem, Overlay, Text } from 'react-native-elements'
import { View, Linking, Alert } from 'react-native'
import { listStyles } from './styles'
import { dateTimeFmt } from '../../utils'

const getFirstPostImage = (images) => {
  const defaultImg = 'https://eumeps-powerparts.eu/assets/generated/images/news-placeholder.png'
  if (images && Array.isArray(images) && images.length) {
    return images[0].type === 'image' ? images[0].url : defaultImg
  }
  return defaultImg
}

const NewsListItem = ({ item, onPress }) => {
  const { title, abstract, published_date, multimedia } = item
  return (
    <ListItem
      title={
        <Text h4 h4Style={{ fontSize: 16 }} data-testid="title">
          {title}
        </Text>
      }
      subtitle={
        <View style={listStyles.subtitleView}>
          <Text data-testid="subtitle" style={listStyles.subtitleText}>{abstract}</Text>
          {published_date && (
            <Text data-testid="published-date" style={listStyles.pubDate}>
              {dateTimeFmt(new Date(published_date))}
            </Text>
          )}
        </View>
      }
      onPress={onPress}
      leftAvatar={{rounded: false, size: 'xlarge', source: {uri: getFirstPostImage(multimedia)}}}
      bottomDivider
      chevron
    />
  )
}

NewsListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    abstract: PropTypes.string,
    published_date: PropTypes.string,
    multimedia: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onPress: PropTypes.func.isRequired,
}

export const ArticleModal = ({ open, onClose, item }) => {
  const { title, abstract, byline, published_date, updated_date, short_url, section } = item

  const handleReadArticle = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        Alert.alert(
          'Can not open this article',
          "Don't know how to open URI: " + url,
          [ {text: 'OK'} ],
        )
      }
    })
  }

  return (
    <Overlay
      isVisible={open}
      onBackdropPress={onClose}
      width="100%"
      height="90%"
      overlayStyle={{ position: 'absolute', bottom: 0 }}
      animationType="slide"
    >
      <>
        <Text h4 h4Style={{ marginBottom: 5 }}>{title}</Text>
        <Text style={listStyles.subtitleText}>{byline}</Text>
        <Text style={listStyles.subtitleText}>Section: {section}</Text>
        { published_date && (
          <Text style={listStyles.subtitleText}>
            Published at:&nbsp;
            {dateTimeFmt(new Date(published_date))}
          </Text>
        )}
        { updated_date && (
          <Text style={listStyles.subtitleText}>
            Last update:&nbsp;
            {dateTimeFmt(new Date(updated_date))}
          </Text>
        )}
        <Text style={listStyles.modalMainText}>{abstract}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <View style={listStyles.modalButtons}>
          <Button
            title="Close"
            type="clear"
            onPress={onClose}
          />
          <Button
            title="Read the full article"
            type="clear"
            onPress={() => handleReadArticle(short_url)}
          />
        </View>

      </>
    </Overlay>
  )
}

ArticleModal.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    byline: PropTypes.string,
    abstract: PropTypes.string,
    published_date: PropTypes.string,
    updated_date: PropTypes.string,
    short_url: PropTypes.string,
    section: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

ArticleModal.defaultProps = {
  open: false,
}

export default NewsListItem