import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LyricLineList from './LyricLineList';

const LyricPanel = () => {
  return (
    <Tabs defaultValue="insert" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="insert">插入歌词</TabsTrigger>
        <TabsTrigger value="preview">歌词预览</TabsTrigger>
        <TabsTrigger value="edit">编辑歌词</TabsTrigger>
      </TabsList>
      <TabsContent value="insert">
        <LyricLineList />
      </TabsContent>
      <TabsContent value="preview">Change your password here.</TabsContent>
      <TabsContent value="edit">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default LyricPanel;
