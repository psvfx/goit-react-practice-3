import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isEmpty: false,
    isVisibleButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getGaleryList(query, page);
    }
  }

  getGaleryList = async (query, page) => {
    try {
      const {
        photos,
        total_results,
        per_page,
        page: currentPage,
      } = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isVisibleButton: currentPage < Math.ceil(total_results / per_page),
      }));
      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }
    } catch (error) {}
  };

  onHandleSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      isEmpty: false,
      isVisibleButton: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, isEmpty, isVisibleButton } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Grid>
          {images.map(({ id, alt, src: { small } }) => {
            return (
              <GridItem key={id}>
                <CardItem>
                  <img src={small} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isVisibleButton && (
          <Button onClick={this.onLoadMore}>Load more</Button>
        )}
      </>
    );
  }
}
