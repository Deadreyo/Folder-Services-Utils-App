import infoIcon from '../assets/info.png';
import searchIcon from '../assets/search.png';
import compressIcon from '../assets/data-compression.png';
import bundleIcon from '../assets/data-collection.png';

const pagesMetadata: {
  [key: string]: {
    text: string;
    icon: string;
    desc: string;
  };
} = {
  '/info': {
    text: 'Folder Info',
    icon: infoIcon,
    desc: 'Gets information about this folder and the biggest and oldest files nested within.',
  },
  '/compress': {
    text: 'Compress Images',
    icon: compressIcon,
    desc: 'Compresses all images inside this folder and put them in a new folder. Does not dive into subfolders',
  },
  '/search': {
    text: 'Deep Image Search',
    icon: searchIcon,
    desc: 'Searches for and shows all images nested inside this folder. Dives into subfolders.',
  },
  '/bundle': {
    text: 'Subfolders Extractor',
    icon: bundleIcon,
    desc: 'Extracts all files from the subfolders and puts them all together in a new folder.',
  },
};

export default pagesMetadata;
