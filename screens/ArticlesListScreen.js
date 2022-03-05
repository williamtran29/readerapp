import * as React from 'react';
import { View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import { useQuery } from 'react-query';
import { Picker } from '@react-native-picker/picker';
import { Modal, Title, Button } from 'react-native-paper';
import get from 'lodash/get';
import filter from 'lodash/filter';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';
import { Divider } from '../components/Divider';
import { ListItem } from '../components/ListItem';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
import { fetchTopArticles, fetchSources } from '../lib/api';

export function ArticlesListScreen({ navigation }) {

  const [selectedSource, setSelectedSource] = React.useState('all');

  const { 
    isLoading, 
    error, 
    data, 
    refetch 
  } = useQuery(['articles'], fetchTopArticles);

  const { 
      isLoading: isLoadingSource, 
      error: errorSource, 
      data: dataSource
  } = useQuery(['sources'], fetchSources);

  const [isShowModal, setShowModal] = React.useState(false);
  const _hideModal = () => setShowModal(false);
  const _showModal = () => setShowModal(true);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="filter" onPress={_showModal}/>
      ),
    });
  }, [navigation]);

  const onListItemPress = React.useCallback(
    (article) => {
      navigation.navigate('ArticleDetail', {
        article,
      });
    },
    [navigation]
  );

  const renderItem = React.useCallback(
    ({ item }) => {
      return <ListItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress]
  );

  if (isLoading || isLoadingSource) return <LoadingIndicator />;

  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;
  if (errorSource) return <ErrorMessage message={errorSource.message}></ErrorMessage>;

  let listArticles = get(data, 'articles', []);

  if (!!selectedSource && selectedSource !== 'all') {
    listArticles = filter(listArticles, (article) => {
      return article.source.name === selectedSource
    })
  }

  return (
    <View>
      <FlatList
        style={styles.container}
        data={listArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <Divider />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
      />
      <Modal 
        visible={isShowModal} 
        onDismiss={_hideModal}
        contentContainerStyle={styles.modalContainerStyle}
      >
        <Title>Filter by headline</Title>
        <Picker
          selectedValue={selectedSource}
          onValueChange={(itemValue, itemIndex) => {
             setSelectedSource(itemValue)
          }}
        >
          <Picker.Item label='All' key='all' value='all' />
          {dataSource.sources.map((source, key) => {
            return (<Picker.Item label={source.name} key={key} value={source.name} />)  
          })}
        </Picker>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%'
  },
  modalContainerStyle: {
    padding: 20, 
    backgroundColor: 'white'
  }
});
