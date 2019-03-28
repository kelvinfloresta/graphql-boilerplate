import DataLoaderFactory from '../dataloader/DataLoaderFactory'

export default function dataLoaderMiddleware (req, res, next): void {
  req.context.dataLoaders = DataLoaderFactory()
  next()
}
