import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, RefreshControl, View } from 'react-native'
import { Header, Image, Text } from 'react-native-elements'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useApiRequest from '../../hooks/request'
import { FETCHING } from '../../hooks/request/actionTypes'
import { listStyles } from './styles'
import NewsListItem, { ArticleModal } from '../NewsListItem'

const logo = require('../../../assets/nyt-logo.png')

const NewsList = ({ route }) => {
  const { colors } = useTheme()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState({})
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

  return (
    <View style={listStyles.container}>
      <Header
        backgroundColor="white"
        centerComponent={<Image source={logo} style={listStyles.headerImg}/>}
      />
      <SafeAreaView style={listStyles.bodyContainer}>
        <FlatList
          keyExtractor={keyExtractor}
          data={response?.results}
          renderItem={({ item }) => <NewsListItem item={item} onPress={() => {
            setModalOpen(true)
            setSelectedItem(item)
          }}/>}
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
            <Text style={listStyles.emptyListText}>Nothing found on '{section}' section.</Text>
          )}
          ListFooterComponent={<Text style={listStyles.emptyListText}>{response?.copyright}</Text>}
        />

        {/* Modal */}
        <ArticleModal
          open={modalOpen}
          item={selectedItem}
          onClose={() => {
            setSelectedItem({})
            setModalOpen(false)
          }}
        />

      </SafeAreaView>
    </View>
  )
}

NewsList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      section: PropTypes.string
    })
  }).isRequired,
}

export  default NewsList