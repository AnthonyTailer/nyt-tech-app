import React from 'react'
import { Button, Divider, ListItem, Overlay, Text } from 'react-native-elements'
import { View, Linking, Alert } from 'react-native'
import { listStyles } from '../NewsList/styles'

const getFirstPostImage = (images) => {
  const defaultImg = 'https://eumeps-powerparts.eu/assets/generated/images/news-placeholder.png'
  if (images && Array.isArray(images) && images.length) {
    return images[0].type === 'image' ? images[0].url : defaultImg
  }
  return defaultImg
}


const NewsListItem = ({ item, onPress }) => {
  return (
    <ListItem
      title={item.title}
      onPress={onPress}
      subtitle={
        <View style={listStyles.subtitleView}>
          <Text style={listStyles.subtitleText}>{item.abstract}</Text>
          {item.published_date && (
            <Text style={listStyles.pubDate}>
              {new Intl.DateTimeFormat('en-US').format(new Date(item.published_date))}
            </Text>
          )}
        </View>
      }
      leftAvatar={{rounded: false, size: 'xlarge', source: {uri: getFirstPostImage(item.multimedia)}}}
      bottomDivider
      chevron
    />
  )
}

export const ArticleModal = ({ open, onClose, item }) => {

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
        <Text h4 h4Style={{ marginBottom: 5 }}>{item?.title}</Text>
        <Text style={listStyles.subtitleText}>{item?.byline}</Text>
        <Text style={listStyles.subtitleText}>Section: {item?.section}</Text>
        { item.published_date && (
          <Text style={listStyles.subtitleText}>
            Published at:&nbsp;
            {new Intl.DateTimeFormat('en-US').format(new Date(item.published_date))}
          </Text>
        )}
        { item.updated_date && (
          <Text style={listStyles.subtitleText}>
            Last update:&nbsp;
            {new Intl.DateTimeFormat('en-US').format(new Date(item.updated_date))}
          </Text>
        )}
        <Text style={listStyles.modalMainText}>{item?.abstract}</Text>
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
            onPress={() => handleReadArticle(item?.short_url)}
          />
        </View>

      </>
    </Overlay>
  )
}

export default NewsListItem