import React from 'react'
import { FlatList, RefreshControl, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useApiRequest from '../../hooks/request'
import { FETCHING } from '../../hooks/request/actionTypes'
import { listStyles } from './styles'

const NewsList = ({ route }) => {
  const { colors } = useTheme()
  const section = route.params?.section
  const [{ status, response }, makeRequest] = useApiRequest(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json`
  )

  const keyExtractor = (item, index) => index.toString()
  const isLoading = status === FETCHING

  // Making the request on component mount and on route.params change
  React.useEffect(() => {
    // only make request when section is defined
    if (route.params?.section) {
      makeRequest()
    }
  }, [route.params?.section])


  const getFirstPostImage = (images) => {
    const defaultImg = 'https://eumeps-powerparts.eu/assets/generated/images/news-placeholder.png'
    if (images && Array.isArray(images) && images.length) {
      return images[0].type === 'image' ? images[0].url : defaultImg
    }
    return defaultImg
  }


  const renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.abstract}
      leftAvatar={{ rounded: false, size: 'xlarge', source: { uri: getFirstPostImage(item.multimedia) } }}
      bottomDivider
      chevron
    />
  )

  return (
    <SafeAreaView style={listStyles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={response?.results}
        renderItem={renderItem}
        refreshControl={(
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => makeRequest()}
            progressBackgroundColor={colors.primary}
            tintColor="#fff"
            colors={['#fff']}
          />
        )}
        ListEmptyComponent={() => status && !isLoading && (
          <View>
            <Text style={listStyles.emptyListText}>Nothing found on '{section}' section.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )

}

export  default NewsList