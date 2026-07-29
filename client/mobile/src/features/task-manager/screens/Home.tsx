import { FlatList, View } from "react-native";
import appStyles from "../../../components/styles";
import Button from "../../../components/ui/button";
import { deleteValueFor } from "../../../api/storage";
import { STORAGE_KEYS } from "../../../api";
import { useAuth } from "../../../provider/auth";
import Topbar from "../components/task/topbar";
import TaskItem from "../components/task/task-item";
import useTask from "../../../provider/task/useTask";

const Home = () => {
  const { dispatch } = useAuth();
  const { tasks } = useTask();
  const handleLogout = async () => {
    await Promise.all([
      deleteValueFor(STORAGE_KEYS.TOKEN),
      deleteValueFor(STORAGE_KEYS.USER),
    ]);

    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <View
      style={[
        appStyles.appBackground,
        appStyles.withPadding,
        appStyles.StackCol,
        { flex: 1 },
      ]}
    >
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskItem {...item} />}
        ListHeaderComponent={
          <View style={{ marginBottom: 16 }}>
            <Topbar />
          </View>
        }
        ListFooterComponent={
          <View style={{ marginTop: 16 }}>
            <Button onPress={handleLogout} title="Log out" />
          </View>
        }
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
