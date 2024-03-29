import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LyricLineList from './LyricLineList';
import PreviewLyric from './PreviewLyric';
import EditLyric from './EditLyric';

const LyricPanel = () => {
  return (
    <Tabs defaultValue="insert" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="insert">插入歌词</TabsTrigger>
        <TabsTrigger value="preview">歌词预览</TabsTrigger>
        <TabsTrigger value="edit">编辑歌词</TabsTrigger>
      </TabsList>
      <TabsContent value="insert" className="h-full">
        <LyricLineList />
      </TabsContent>
      <TabsContent value="preview" className="h-full">
        <PreviewLyric />
      </TabsContent>
      <TabsContent value="edit" className="h-full">
        <EditLyric />
      </TabsContent>
    </Tabs>
  );
};

export default LyricPanel;
